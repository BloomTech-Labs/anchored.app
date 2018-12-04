const db = require('../../../data/dbConfig');

function findAllByAccount(account_id) {
  return db('docusign')
    .distinct()
    .select(
      'docusign.id',
      'docusign.document_expiration',
      'docusign.access_token',
      'docusign.refresh_token',
      'docusign.token_expiration',
      'docusign.base_uri'
    )
    .where('docusign.id', account_id);
}

function findAllByUser(user_id) {
  return db('docusign')
    .distinct()
    .join('users', 'users.id', '=', 'docusign.user_id')
    .select(
      'docusign.id',
      'docusign.document_expiration',
      'docusign.access_token',
      'docusign.refresh_token',
      'docusign.token_expiration',
      'docusign.base_uri'
    )
    .where('docusign.user_id', user_id);
}

function addInfo(info) {
  return db('docusign')
    .insert(info)
    .returning('id')
    .into('docusign')
    .then(ids => ({ id: ids[0] }));
}

function updateInfo(id, changes) {
  return db('docusign')
    .where({ id })
    .update(changes);
}

module.exports = {
  findAllByAccount,
  findAllByUser,
  addInfo,
  updateInfo,
};
