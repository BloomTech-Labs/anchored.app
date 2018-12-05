exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_envelopes', function(tbl) {
    tbl.increments();

    tbl
      .string('account_id')
      .unsigned()
      .references('id')
      .inTable('docusign');

    tbl
      .integer('envelope_id')
      .unsigned()
      .references('id')
      .inTable('envelopes');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_envelopes');
};
