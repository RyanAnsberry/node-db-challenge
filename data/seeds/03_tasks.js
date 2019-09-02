
exports.seed = function(knex, Promise) {
  // return knex('tasks').del()
    // .then(function () {
      return knex('tasks').insert([
        { id: 1, description: 'Create db schema.', notes: 'Use readme for data shape.', project_id: 1 },
        { id: 2, description: 'Migrate and seed table data.', notes: 'Using knex.', project_id: 1 },
        { id: 3, description: 'Repair broken wall.', notes: 'Patching and Painting', project_id: 2 },
        { id: 4, description: 'Splice wiring to outlets.', notes: 'Electrical work.', project_id: 2 },
        { id: 5, description: 'Touch up exterior paint.', notes: 'Painting and masking.', project_id: 2 },
        { id: 6, description: 'Balance checkbook', project_id: 3 },
        { id: 7, description: 'Reduce debt.', notes: 'Spend less than you earn.', project_id: 3 }
      ]);
    // });
};
