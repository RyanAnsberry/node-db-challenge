
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('description');
      tbl.boolean('completed').defaultTo(false);
  })
  .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.string('description');
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects');
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.string('description').notNullable();
        tbl.string('notes');
        tbl.boolean('completed').defaultTo(false);
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
