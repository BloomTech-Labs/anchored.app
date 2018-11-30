const db = require('../../data/dbConfig.js');

function find() {
  return db('users');
}

function findByUserId(id) {
  return db('users')
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user)
    .into('users');
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function removeUser(id) {
  return db('users')
    .where({ id })
    .del();
}

function incrementCredit() {
  return db('users').increment('credits', 1);
}

module.exports = {
  find,
  findByUserId,
  findByEmail,
  addUser,
  updateUser,
  removeUser,
  incrementCredit,
};
