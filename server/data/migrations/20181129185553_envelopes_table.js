exports.up = function(knex, Promise) {
  return knex.schema.createTable('envelopes', function(tbl) {
    // TODO: Create doc ids based on DocuSign
    tbl.increments();

    tbl.string('verified_proof', 1024);

    tbl.string('proof_handle', 1024);

    tbl.string('status');

    tbl.string('subject');

    tbl.string('envelope_id');

    tbl.string('waiting_expiration', 128).defaultTo(0);

    tbl.string('loading_expiration', 128).defaultTo(0);

    tbl.bool('verified').defaultTo(false);

    tbl.bool('waiting').defaultTo(false);

    tbl.bool('loading').defaultTo(false);

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('envelopes');
};
