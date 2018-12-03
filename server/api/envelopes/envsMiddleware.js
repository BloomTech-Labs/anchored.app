const moment = require('moment');
const axios = require('axios');
const { promisify } = require('util');
const chp = require('chainpoint-client');

const users = require('../users/usersModel');
const envs = require('./envelopesModel');

function handleExpiration(req, res, next) {
  let header = {
    headers: { Authorization: 'Basic ' + process.env.DOCUSIGN_BASE64 },
  };

  let data = {
    grant_type: 'refresh_token',
    refresh_token: req.user.refresh_token,
  };

  axios
    .post('https://account-d.docusign.com/oauth/token', data, header)
    .then(response => {
      let expiration = moment().add(response.data.expires_in, 's');
      req.user.access_token = response.data.access_token;
      req.user.refresh_token = response.data.refresh_token;
      req.user.token_expiration = JSON.stringify(expiration);
      req.session.save();
      users.updateUser(req.user.id, req.user).catch(err => console.log(err));
      next();
    })
    .catch(err => res.status(401).json({ ErrorMessage: err.response.data }));
}

async function getEnvelopesList(envelopesApi, account_id) {
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

// async function getImages(envelopesApi, account_id, documents) {
//   let imagesP = promisify(envelopesApi.getDocumentPageImage).bind(envelopesApi);
//   let results = [];
//   for (let i = 0; i < documents.length; i++) {
//     for (let j = 0; j < documents[i].envelopeDocuments.length; j++) {
//       let envelope_id = documents[i].envelopeId;
//       let document_id = documents[i].envelopeDocuments[j].documentId;
//       let status = documents[i].status;
//       if (!document_id || document_id === 'certificate') break;

//       let image = await imagesP(account_id, envelope_id, document_id, '1', {
//         maxWidth: '200',
//         maxHeight: '300',
//       });

//       if (image) {
//         results.push({ envelope_id, document_id, status, image });
//       }
//     }
//   }
//   return results;
// }

async function postEnvToDB(req, res, new_envelopes) {
  let user_envelopes = await envs.findAllByUser(req.user.id);
  for (let i = 0; i < new_envelopes.length; i++) {
    let index = user_envelopes.findIndex(
      env => env.envelope_id == new_envelopes[i].envelope_id
    );
    if (index === -1) {
      // Add an envelope if not found
      let ids = await envs.addEnv(new_envelopes[i]);
      new_envelopes[i].id = ids.id;
      new_envelopes[i].verified = 0;
      user_envelopes.push(new_envelopes[i]);

      let user_env = { account_id: req.user.account_id, envelope_id: ids.id };
      await envs.addUserToEnv(user_env);
    } else {
      const expiration = JSON.parse(user_envelopes[i].waiting_expiration);
      const expired = moment().isAfter(expiration);
      if (user_envelopes[index].status !== 'completed') {
        // Update envelope if found and not completed
        await envs.updateEnv(user_envelopes[index].id, new_envelopes[i]);
        new_envelopes[i].id = user_envelopes[index].id;
        new_envelopes[i].verified = user_envelopes[index].verified;
        user_envelopes[index] = user_envelopes[i];
      } else if (user_envelopes[index].waiting && expired) {
        // Check if document / envelope has been anchored to bitcoin
        const proofHandle = [JSON.parse(user_envelopes[index].proof_handle)];
        const proof = await chp.getProofs(proofHandle);
        const verifiedProofs = await chp.verifyProofs(proof);
        const verified = verifiedProofs.find(proof => proof.type === 'btc');

        if (!verified) {
          // Check again in 10 minutes
          const waiting_expiration = JSON.stringify(moment().add(10, 'm'));
          await envs.updateEnv(user_envelopes[index].id, {
            waiting_expiration,
          });
          user_envelopes[index].waiting_expiration = waiting_expiration;
          break;
        }

        const verified_proof = JSON.stringify(verified);
        const proof_handle = JSON.stringify(proofHandle[0]);

        await envs.updateEnv(user_envelopes[index].id, {
          verified_proof,
          proof_handle,
          verified: verified.verified,
          waiting: !verified.verified,
        });

        user_envelopes[index].verified_proof = verified_proof;
        user_envelopes[index].proof_handle = proof_handle;
        user_envelopes[index].verified = verified.verified;
        user_envelopes[index].waiting = !verified.verified;
      }
    }
  }
  return res.status(200).json(user_envelopes);
}

function checkExpiration(req, res, next) {
  if (moment().isAfter(JSON.parse(req.user.document_expiration))) {
    req.user.document_expiration = JSON.stringify(moment().add(15, 'm'));
    req.session.save();
    users.updateUser(req.user.id, req.user).catch(err => console.log(err));
    return next();
  }
  envs
    .findAllByUser(req.user.id)
    .then(envs => res.status(200).json(envs))
    .catch(err => res.status(500).json({ ErrorMessage: err.message }));
}

function checkToken(req, res, next) {
  let expiration = JSON.parse(req.user.token_expiration);
  let now = moment();

  if (req.user.access_token && now.add(30, 'm').isBefore(expiration)) {
    return next();
  } else if (!req.user.access_token || !req.user.refresh_token) {
    return res.status(401).json({ message: 'You need to be logged in!' });
  } else {
    return handleExpiration(req, res, next);
  }
}

module.exports = {
  checkExpiration,
  checkToken,
  getEnvelopes,
  getEnvelopesList,
  // getImages,
  postEnvToDB,
};
