const docs = require('./documentsModel');
const { promisify } = require('util');

async function postDoctoDB(req, res, documents) {
  const ids = await docs.addDoc({ document: documents.documents });
  const user_doc = { account_id: req.user.account_id, document_id: ids.id };
  await docs.addUserToDoc(user_doc);
}

async function getDocuments(envelopesApi, account_id, envelope_id) {
  const documentsP = promisify(envelopesApi.getDocument).bind(envelopesApi);
  const documents = await documentsP(account_id, envelope_id, 'combined', {
    encoding: 'base64',
  });
  return { documents, envelope_id };
}

module.exports = { postDoctoDB, getDocuments };
