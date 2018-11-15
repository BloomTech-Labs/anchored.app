const moment = require('moment');
const axios = require('axios');
const { promisify } = require('util');

const users = require('../users/usersModel');
const docs = require('./documentsModel');

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

async function getEnvelopes(envelopesApi, account_id) {
  let options = {
    fromDate: moment()
      .subtract(30, 'days')
      .format(),
  };
  let envelopesP = promisify(envelopesApi.listStatusChanges).bind(envelopesApi);
  let envelopes;
  try {
    envelopes = await envelopesP(account_id, options);
  } catch (err) {
    console.log(err);
  }
  return envelopes;
}

function getDocuments(envelopesApi, account_id, envelopes) {
  let documentsP = promisify(envelopesApi.listDocuments).bind(envelopesApi);
  let promises = envelopes.envelopes.map(envelope => {
    let envelope_id = envelope.envelopeId;
    return documentsP(account_id, envelope_id, null);
  });
  return Promise.all(promises)
    .then(res => res)
    .catch(err => console.log(err));
}

async function getImages(envelopesApi, account_id, documents) {
  let imagesP = promisify(envelopesApi.getDocumentPageImage).bind(envelopesApi);
  let results = [];
  for (let i = 0; i < documents.length; i++) {
    for (let j = 0; j < documents[i].envelopeDocuments.length; j++) {
      let envelope_id = documents[i].envelopeId;
      let document_id = documents[i].envelopeDocuments[j].documentId;

      if (!document_id || document_id === 'certificate') break;

      let image = await imagesP(account_id, envelope_id, document_id, '1', {
        maxWidth: '200',
        maxHeight: '300',
      });

      if (image) {
        results.push({ envelope_id, document_id, image });
      }
    }
  }
  return results;
}

function postDocToDB(req, res, images) {
  docs
    .findAllByUser(req.user.id)
    .then(docus => {
      for (let j = 0; j < images.length; j++) {
        let found = docus.find(
          doc =>
            doc.document_id == images[j].document_id &&
            doc.envelope_id == images[j].envelope_id
        );
        if (!found) {
          docs
            .addDoc(images[j])
            .then(ids => {
              let user_doc = { user_id: req.user.id, document_id: ids[0] };
              docs.addUserToDoc(user_doc).catch(err => console.log(err));
            })
            .catch(err => console.log(err));
          docus.push(images[j]);
        }
      }
      return res.status(200).json(docus);
    })
    .catch(err => res.status(500).json({ ErrorMessage: err.message }));
}

function checkExpiration(req, res, next) {
  if (moment().isAfter(JSON.parse(req.user.document_expiration))) {
    req.user.document_expiration = JSON.stringify(moment().add(15, 'm'));
    req.session.save();
    users.updateUser(req.user.id, req.user).catch(err => console.log(err));
    return next();
  }
  docs
    .findAllByUser(req.user.id)
    .then(docus => res.status(200).json(docus))
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
  getDocuments,
  getImages,
  postDocToDB,
};
