const db = require('../../data/dbConfig.js');

function find() {
  return db('envelopes');
}

function findAllByUser(account_id) {
  return db('envelopes')
    .distinct()
    .join('users_envelopes', 'users_envelopes.envelope_id', '=', 'envelopes.id')
    .join('docusign', 'docusign.id', '=', 'users_envelopes.account_id')
    .select(
      'envelopes.id',
      'envelopes.verified_proof',
      'envelopes.proof_handle',
      'envelopes.envelope_id',
      'envelopes.subject',
      'envelopes.status',
      'envelopes.verified',
      'envelopes.waiting',
      'envelopes.waiting_expiration',
      'envelopes.loading',
      'envelopes.loading_expiration',
      'envelopes.created_at'
    )
    .where('account_id', account_id);
}

function findAllByWaiting() {
  return db('envelopes').where({ waiting: 1 });
}

function findById(id) {
  return db('envelopes')
    .where({ id })
    .first();
}

function addEnv(env) {
  return db('envelopes')
    .insert(env)
    .returning('id')
    .into('envelopes')
    .then(ids => ({ id: ids[0] }));
}

function addUserToEnv(userEnv) {
  return db('users_envelopes')
    .insert(userEnv)
    .into('users_envelopes');
}

function findAccountIdById(id) {
  return db('users_envelopes')
    .where({ id })
    .then(ids => ids[0].account_id);
}

function findUserIdByAccountId(id) {
  return db('docusign')
    .where({ id })
    .then(ids => ids[0].user_id);
}

function updateEnv(id, changes) {
  return db('envelopes')
    .where({ id })
    .update(changes);
}

function removeEnv(id) {
  return db('envelopes')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findAllByUser,
  findAllByWaiting,
  findById,
  findAccountIdById,
  findUserIdByAccountId,
  addEnv,
  addUserToEnv,
  updateEnv,
  removeEnv,
};
