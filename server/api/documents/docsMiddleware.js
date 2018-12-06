const docs = require('./documentsModel');
const envs = require('../envelopes/envelopesModel');

const { promisify } = require('util');

async function postDoctoDB(req, res, new_documents) {
  const user_documents = await docs.findAllByUser(req.user.account_id);
  // Loop over new documents and check if they are in the DB already
  for (let i = 0; i < new_documents.length; i++) {
    const index = user_documents.findIndex(doc => {
      return doc.envelope_id == new_documents[i].envelope_id;
    });

    if (index === -1) {
      // Add a document if not found
      const ids = await docs.addDoc(new_documents[i]);
      const user_doc = { account_id: req.user.account_id, document_id: ids.id };
      await docs.addUserToDoc(user_doc);
    } else {
      // Update a document if found
      await docs.updateDoc(user_documents[index].id, new_documents[i]);
    }
  }
}

async function getDocuments(envelopesApi, account_id, envelopesList) {
  const user_envelopes = await envs.findAllByUser(account_id);
  const user_documents = await docs.findAllByUser(account_id);

  const documentsP = promisify(envelopesApi.getDocument).bind(envelopesApi);
  const results = [];

  for (let i = 0; i < envelopesList.envelopes.length; i++) {
    const status = envelopesList.envelopes[i].status;
    const envelope_id = envelopesList.envelopes[i].envelopeId;

    // Only get document if status of envelope has changed
    const found_document = user_documents.find(doc => {
      return doc.envelope_id == envelope_id;
    });

    const found_envelope = user_envelopes.find(env => {
      return env.envelope_id == envelope_id && env.status == status;
    });

    if (found_envelope && found_document) continue;

    const document = await documentsP(account_id, envelope_id, 'combined', {
      encoding: 'base64',
    });

    if (document) {
      results.push({ document, envelope_id });
    }
  }
  return results;
}

module.exports = { postDoctoDB, getDocuments };
