exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_invoice', function(tbl) {
    tbl.increments();

    tbl
      .string('user_id')
      .unsigned()
      .references('id')
      .inTable('users');

    tbl.integer('amount');

    tbl.string('description');

    tbl.string('currency');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_invoice');
};
