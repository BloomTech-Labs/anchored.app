exports.up = function(knex, Promise) {
  return knex.schema.createTable('docusign', function(tbl) {
    // TODO: Create doc ids based on DocuSign
    tbl
      .string('id')
      .notNullable()
      .unique()
      .primary();

    tbl
      .string('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.string('document_expiration', 128).defaultTo(0);

    tbl.string('access_token', 1024);

    tbl.string('refresh_token', 1024);

    tbl.string('token_expiration', 128).defaultTo(0);

    tbl.string('base_uri', 128);

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('docusign');
};
