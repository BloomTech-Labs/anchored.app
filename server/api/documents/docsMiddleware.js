const docs = require('./documentsModel');
const { promisify } = require('util');

async function postDoctoDB(req, res, documents) {
  try {
    let ids = await docs.addDoc({ document: documents.documents });
    let envelope_id = documents.envelope_id;
    let user_doc = { user_id: req.user.id, envelope_id, document_id: ids.id };
    await docs.addUserToDoc(user_doc);
  } catch (err) {
    return res.status(500).json({ ErrorMessage: err.message });
  }
}

async function getDocuments(envelopesApi, account_id, envelope_id) {
  let documentsP = promisify(envelopesApi.getDocument).bind(envelopesApi);
  let documents = await documentsP(account_id, envelope_id, 'combined');
  return { documents, envelope_id };
}

module.exports = { postDoctoDB, getDocuments };
