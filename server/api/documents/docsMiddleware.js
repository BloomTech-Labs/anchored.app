const docs = require('./documentsModel');
const { promisify } = require('util');

async function postDoctoDB(req, res, documents) {
  let ids = await docs.addDoc({ document: documents.documents });
  let user_doc = { user_id: req.user.id, document_id: ids.id };
  await docs.addUserToDoc(user_doc);
}

async function getDocuments(envelopesApi, account_id, envelope_id) {
  let documentsP = promisify(envelopesApi.getDocument).bind(envelopesApi);
  let documents = await documentsP(account_id, envelope_id, 'combined', {
    encoding: 'base64',
  });
  return { documents, envelope_id };
}

module.exports = { postDoctoDB, getDocuments };
