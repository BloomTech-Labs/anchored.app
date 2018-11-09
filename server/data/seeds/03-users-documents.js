exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_documents')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users_documents').insert([
        { user_id: 1, document_id: 1 },
        { user_id: 2, document_id: 2 },
        { user_id: 3, document_id: 3 },
      ]);
    });
};
