exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // TODO: Create a user ids based on Auth0
    tbl
      .string('id')
      .notNullable()
      .unique()
      .primary();

    tbl.string('first_name', 128);

    tbl.string('last_name', 128);

    tbl.string('username', 128).unique();

    tbl.string('email', 128).unique();

    tbl.string('phone_number', 128).unique();

    tbl.string('documents', 1024);

    tbl.string('document_expiration', 128).defaultTo(0);

    tbl.string('account_id', 128);

    tbl.string('access_token', 1024);

    tbl.string('refresh_token', 1024);

    tbl.string('token_expiration', 128).defaultTo(0);

    tbl.string('base_uri', 128);

    tbl
      .integer('credits')
      .unsigned()
      .notNullable()
      .defaultTo(3);

    tbl
      .boolean('subscription')
      .defaultTo(false)
      .notNullable();

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
