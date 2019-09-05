
exports.seed = function(knex, Promise) {
  // return knex('resources').del()
    // .then(function () {
      return knex('resources').insert([
        { id: 1, name: 'Programmer', description: "The one who completes the sprint challenge.", project_id: 1 },
        { id: 2, name: 'Repairman', description: "Expert in all things repair.", project_id: 2 },
        { id: 3, name: 'Electrician', description: "Expert in wiring and electrical hazards.", project_id: 2 },
        { id: 4, name: 'Painter', description: "Expert in painting practices.", project_id: 2 },
        { id: 5, name: 'Banker', description: "Professional accountant.", project_id: 3 }
      ]);
    // });
};
