
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('teams').del(), 

    // Inserts seed entries
    knex('teams').insert({name: 'Team One'}),
    knex('teams').insert({name: 'Team Two'})
  );
};
