const db = require('../../data/dbConfig.js');

function find() {
  return db('users_invoice');
}

function addInvoice(invoice) {
  return db('users_invoice')
    .insert(invoice)
    .into('users_invoice');
}

module.exports = {
  find,
  addInvoice,
};
