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

    tbl.string('username', 128);

    tbl.string('email', 128);

    tbl.string('picture', 256).unique();

    tbl.binary('uploaded_picture');

    tbl.string('phone_number', 128).unique();

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
