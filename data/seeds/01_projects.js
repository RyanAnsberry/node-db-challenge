
exports.seed = function(knex, Promise) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        { id: 1, name: 'Sprint Challenge', description: "How to complete a sprint challenge." },
        { id: 2, name: 'Repair Work',  description: "A list of taks to be done and rescources to do them." },
        { id: 3, name: 'Financing',  description: "Financial steps and resources to help." }
      ]);
    });
};
