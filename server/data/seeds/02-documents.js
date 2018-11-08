exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('documents')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('documents').insert([
        {
          proof: 'imklrn2r8xjqj4i7d4e8nh2rul9l9qvoinnc7nx77j4fjjr0gud9upjgraif',
        },
        {
          proof: 'lwkg1ntwn5qxga4bnt8nrhjezke2pjo8beshjgaafc0xkuvob607ps2lnb99',
        },
        {
          proof: '682o29im0fdkzqk1uy9s0elw4zebi7ahl10p6kr3a1eixhzw9f7auwl6r2tj',
        },
      ]);
    });
};
