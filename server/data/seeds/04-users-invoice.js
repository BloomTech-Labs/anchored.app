exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_invoice')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_invoice').insert([
        {
          id: 1,
          user_id: '1',
          description: 'Credit Purchase',
          amount: 4,
          currency: 'USD',
        },
      ]);
    });
};
