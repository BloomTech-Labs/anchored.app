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

async function getEnvelopesList(envelopesApi, account_id) {
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

async function getDocuments(envelopesApi, account_id, documents) {
  let documentsP = promisify(envelopesApi.getDocument).bind(envelopesApi);
  let results = [];
  for (let i = 0; i < documents.envelopeDocuments.length; i++) {
    let envelope_id = documents.envelopeId;
    let document_id = documents.envelopeDocuments[i].documentId;

    if (!document_id || document_id === 'certificate') break;

    let document = await documentsP(account_id, envelope_id, document_id);

    if (document) {
      results.push(document);
    }
  }
  return results;
}

async function getDocumentsList(envelopesApi, account_id, envelope_id) {
  let documentsP = promisify(envelopesApi.listDocuments).bind(envelopesApi);
  let documents = await documentsP(account_id, envelope_id);
  return documents;
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

async function postDocToDB(req, res, envelopes) {
  try {
    let documents = await docs.findAllByUser(req.user.id);
    for (let i = 0; i < envelopes.length; i++) {
      let index = documents.findIndex(
        doc => doc.envelope_id == envelopes[i].envelope_id
      );
      if (index === -1) {
        // Add a doc if not found
        let ids = await docs.addDoc(envelopes[i]);

        envelopes[i].id = ids.id;
        documents.push(envelopes[i]);

        let user_doc = { user_id: req.user.id, document_id: ids.id };
        await docs.addUserToDoc(user_doc);
      } else {
        // Update doc if found
        await docs.updateDoc(documents[index].id, envelopes[i]);
        envelopes[i].id = documents[index].id;
        documents[index] = envelopes[i];
      }
    }
    return res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ ErrorMessage: err.message });
  }
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
  getEnvelopesList,
  getDocuments,
  getDocumentsList,
  // getImages,
  postDocToDB,
};
