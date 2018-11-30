exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_documents', function(tbl) {
    tbl.increments();

    tbl
      .string('user_id')
      .unsigned()
      .references('id')
      .inTable('users');

    tbl
      .integer('document_id')
      .unsigned()
      .references('id')
      .inTable('documents');

    tbl
      .integer('envelope_id')
      .unsigned()
      .references('envelope_id')
      .inTable('envelopes');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
