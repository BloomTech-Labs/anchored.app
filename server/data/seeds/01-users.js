exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Ron',
          last_name: 'Swanson',
          username: 'ron_swanson',
          email: 'rswanson@pawnee.gov',
          phone_number: '415-123-1234',
          credits: 3,
          subscription: false,
          id: '1'
        },
        {
          first_name: 'Leslie',
          last_name: 'Knope',
          username: 'leslie_knope',
          email: 'lknope@pawnee.gov',
          phone_number: '415-123-5678',
          credits: 3,
          subscription: false,
          id: '2'
        },
        {
          first_name: 'April',
          last_name: 'Ludgate',
          username: 'april_ludgate',
          email: 'aludgate@pawnee.gov',
          phone_number: '415-123-9011',
          credits: 3,
          subscription: false,
          id: '3'
        },
        {
          first_name: 'Andy',
          last_name: 'Dwyer',
          username: 'andy_dwyer',
          email: 'adwyer@pawnee.gov',
          phone_number: '415-123-1213',
          credits: 3,
          subscription: false,
          id: '4'
        },
        {
          first_name: 'Ben',
          last_name: 'Wyatt',
          username: 'ben_wyatt',
          email: 'bwyatt@pawnee.gov',
          phone_number: '415-123-1415',
          credits: 3,
          subscription: false,
          id: '5'
        },
      ]);
    });
};
