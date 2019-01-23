const moment = require('moment');
const axios = require('axios');
const { promisify } = require('util');
const chp = require('chainpoint-client');

const envs = require('./envelopesModel');
const users = require('../users/usersModel');

const docusignModel = require('../auth/docusign/docusignModel');

function handleExpiration(req, res, next) {
  // Gets a new access token using the refresh token if a user's token has expired
  const header = {
    headers: { Authorization: 'Basic ' + process.env.DOCUSIGN_BASE64 },
  };

  const data = {
    grant_type: 'refresh_token',
    refresh_token: req.user.refresh_token,
  };

  const URL =
    process.env.DB === 'production'
      ? 'https://account.docusign.com'
      : 'https://account-d.docusign.com';

  axios
    .post(`${URL}/oauth/token`, data, header)
    .then(response => {
      const expiration = moment().add(response.data.expires_in, 's');

      const changes = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        token_expiration: JSON.stringify(expiration),
      };

      req.user = { ...req.user, ...changes };
      req.session.save();

      docusignModel
        .updateInfo(req.user.account_id, changes)
        .catch(err => console.log(err));

      next();
    })
    .catch(err => res.status(401).json({ ErrorMessage: err.response.data }));
}

async function getEnvelopesList(envelopesApi, account_id) {
  // Gets a list of envelopes from the user's docusign account
  let options = {
    fromDate: moment()
      .subtract(6, 'months')
      .format(),
  };
  let envelopesP = promisify(envelopesApi.listStatusChanges).bind(envelopesApi);
  let envelopes = await envelopesP(account_id, options);
  return envelopes;
}

async function getEnvelopes(envelopesApi, account_id, envelopes) {
  // Gets specific envelope information from docusign;
  let envelopesP = promisify(envelopesApi.getEnvelope).bind(envelopesApi);
  let results = [];
  for (let i = 0; i < envelopes.envelopes.length; i++) {
    let envelope_id = envelopes.envelopes[i].envelopeId;
    let envelope = await envelopesP(account_id, envelope_id);
    let status = envelope.status;
    let subject = envelope.emailSubject;

    if (envelope) {
      results.push({ subject, status, envelope_id });
    }
  }
  return results;
}

async function postEnvToDB(req, res, new_envelopes) {
  // Updates / Adds the user's envelopes to the DB
  const account_id = req.user.account_id;
  const user_envelopes = await envs.findAllByUser(account_id);
  for (let i = 0; i < new_envelopes.length; i++) {
    const index = user_envelopes.findIndex(
      env => env.envelope_id == new_envelopes[i].envelope_id
    );
    if (index === -1) {
      // Add an envelope if not found
      const ids = await envs.addEnv(new_envelopes[i]);
      new_envelopes[i].id = ids.id;
      new_envelopes[i].verified = 0;
      new_envelopes[i].waiting = 0;
      user_envelopes.push(new_envelopes[i]);

      const user_env = { account_id, envelope_id: ids.id };
      await envs.addUserToEnv(user_env);
    } else if (user_envelopes[index].status !== 'completed') {
      // Update envelope if found and not completed
      await envs.updateEnv(user_envelopes[index].id, new_envelopes[i]);
      new_envelopes[i].id = user_envelopes[index].id;
      new_envelopes[i].verified = user_envelopes[index].verified;
      new_envelopes[i].waiting = user_envelopes[index].waiting;
      user_envelopes[index] = new_envelopes[i];
    }
  }
  return res.status(200).json(user_envelopes);
}

function checkExpiration(req, res, next) {
  // Check if the 15 minute expiration for making api calls to docusign has expired
  const expiration = req.user.document_expiration;
  if (!expiration || moment().isAfter(JSON.parse(expiration))) {
    const document_expiration = JSON.stringify(moment().add(15, 'm'));
    req.user.document_expiration = document_expiration;
    req.session.save();
    docusignModel
      .updateInfo(req.user.account_id, { document_expiration })
      .catch(err => console.log(err));
    return next();
  }
  envs
    .findAllByUser(req.user.account_id)
    .then(envs => res.status(200).json(envs))
    .catch(err => res.status(500).json({ ErrorMessage: err.message }));
}

function checkToken(req, res, next) {
  // Check if a user's access token has expired / is valid
  if (req.user.access_token && req.user.refresh_token) {
    const expiration = JSON.parse(req.user.token_expiration);
    const now = moment();
    if (now.add(30, 'm').isBefore(expiration)) {
      return next();
    } else {
      return handleExpiration(req, res, next);
    }
  } else {
    return res.status(200).json(null);
  }
}

async function checkWaiting() {
  try {
    const envelopes = await envs.findAllByWaiting();

    for (let i = 0; i < envelopes.length; i++) {
      const envelope = envelopes[i];
      const expiration = JSON.parse(envelope.waiting_expiration);
      const expired = moment().isAfter(expiration);

      if (expired) {
        const calendarProof = JSON.parse(envelope.verified_proof);

        const proofHandle = [JSON.parse(envelope.proof_handle)];
        const proofs = await chp.getProofs(proofHandle);

        const index = proofs.findIndex(proof => proof.proof !== null);
        const proof = [proofs[index]];

        if (!proof[0]) {
          // If documents haven't been proofed within 24 hours, refund credits / remove envelope from waiting stage
          const now = moment();
          const proofExpired = moment(calendarProof.hashSubmittedNodeAt)
            .add(24, 'h')
            .isBefore(now);

          if (proofExpired) {
            const accountId = await envs.findAccountIdById(envelope.id);
            const userId = await envs.findUserIdByAccountId(accountId);

            await users.incrementCredit(userId, 1);
            await envs.updateEnv(envelope.id, {
              verified_proof: null,
              proof_handle: null,
              verified: 0,
              waiting: 0,
              loading: 0,
              waiting_expiration: 0,
              loading_expiration: 0,
            });
          }
          continue;
        }

        const verifiedProofs = await chp.verifyProofs(proof);
        const verified = verifiedProofs.find(proof => proof.type === 'btc');

        if (!verified) continue;

        const verified_proof = JSON.stringify(verified);
        const proof_handle = JSON.stringify(proofHandle[0]);

        await envs.updateEnv(envelope.id, {
          verified_proof,
          proof_handle,
          verified: verified.verified,
          waiting: !verified.verified,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  checkExpiration,
  checkToken,
  checkWaiting,
  getEnvelopes,
  getEnvelopesList,
  postEnvToDB,
};
