const db = require('../../data/dbConfig.js');

function find() {
  return db('users_invoice');
}

function findByUserId(id) {
  return db('users_invoice').where({ user_id: id });
}

function addInvoice(invoice) {
  return db('users_invoice')
    .insert(invoice)
    .into('users_invoice');
}

module.exports = {
  find,
  findByUserId,
  addInvoice,
};
