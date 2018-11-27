exports.up = function(knex, Promise) {
  return knex.schema.createTable('documents', function(tbl) {
    // TODO: Create doc ids based on DocuSign
    tbl.increments();

    tbl.string('proof', 1024).unique();

    tbl.string('document_id');

    tbl.string('envelope_id');

    tbl.binary('image');

    tbl.string('status');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('documents');
};
