exports.up = function(knex, Promise) {
  return knex.schema.createTable('documents', function(tbl) {
    // TODO: Create doc ids based on DocuSign
    tbl.increments();

    tbl.string('document');

    tbl.json('proof_handle').unique();

    tbl.json('verified_proof').unique();

    tbl.string('status');

    tbl.string('subject');

    tbl.string('envelope_id');

    tbl.bool('verified').defaultTo(false);

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('documents');
};
