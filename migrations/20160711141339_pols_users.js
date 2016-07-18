'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('pols_users', (table) => {
    table.increments();
    table
      .integer('pol_id')
      .notNullable()
      .references('id')
      .inTable('pols')
      .onDelete('CASCADE')
      .index();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pols_users');
};
