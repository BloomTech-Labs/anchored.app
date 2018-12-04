const db = require('../../data/dbConfig.js');

function find() {
  return db('documents');
}

function findAllByUser(account_id) {
  return db('documents')
    .distinct()
    .join('users_documents', 'users_documents.document_id', '=', 'documents.id')
    .join(
      'envelopes',
      'envelopes.envelope_id',
      '=',
      'users_documents.envelope_id'
    )
    .join('docusign', 'docusign.id', '=', 'users_documents.account_id')
    .select('documents.id', 'documents.document', 'documents.created_at')
    .where('account_id', account_id);
}

function findById(id) {
  return db('documents')
    .where({ id })
    .first();
}

function addDoc(doc) {
  return db('documents')
    .insert(doc)
    .returning('id')
    .into('documents')
    .then(ids => ({ id: ids[0] }));
}

function addUserToDoc(userDoc) {
  return db('users_documents')
    .insert(userDoc)
    .into('users_documents');
}

function updateDoc(id, changes) {
  return db('documents')
    .where({ id })
    .update(changes);
}

function removeDoc(id) {
  return db('documents')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findAllByUser,
  findById,
  addDoc,
  addUserToDoc,
  updateDoc,
  removeDoc,
};
