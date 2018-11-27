exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_invoice', function(tbl) {
    tbl.increments();

    tbl
      .string('user_id')
      .unsigned()
      .references('id')
      .inTable('users');

    tbl.string('description', 128);

    tbl
      .integer('amount')
      .unsigned()
      .notNullable();

    tbl.string('currency', 128);

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('invoice');
};

// currency and amount + timestamp
