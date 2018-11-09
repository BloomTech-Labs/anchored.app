exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // TODO: Create a user ids based on Auth0
    tbl.increments();

    tbl.string('first_name', 128);

    tbl.string('last_name', 128);

    tbl
      .string('username', 128)
      .notNullable()
      .unique();

    tbl
      .string('email', 128)
      .notNullable()
      .unique();

    tbl
      .string('user_id')
      .notNullable()
      .unique();

    tbl.string('phone_number', 128).unique();

    tbl.string('documents', 1024);

    tbl.string('expires', 100).defaultTo(0);

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
