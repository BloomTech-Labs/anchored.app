const db = require('../../data/dbConfig.js');

function find() {
  return db('envelopes');
}

function findAllByUser(user_id) {
  return db('envelopes')
    .distinct()
    .join('users_envelopes', 'users_envelopes.envelope_id', '=', 'envelopes.id')
    .join('users', 'users.id', '=', 'users_envelopes.user_id')
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
      'envelopes.created_at'
    )
    .where('user_id', user_id);
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
  findById,
  addEnv,
  addUserToEnv,
  updateEnv,
  removeEnv,
};
