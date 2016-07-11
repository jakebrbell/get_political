'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('pols', (table) => {
    table.increments();
    table.string('bioguide_id').notNullable().defaultTo('');
    table.string('name').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.string('state_name').notNullable().defaultTo('');
    table.string('district').notNullable().defaultTo('');
    table.string('party').notNullable().defaultTo('');
    table.string('street').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.specificType('state', 'char(2)').notNullable().defaultTo('');
    table.string('zipcode').notNullable().defaultTo('');
    table.string('phone').notNullable().defaultTo('');
    table.string('twitter').notNullable().defaultTo('');
    table.string('facebook').notNullable().defaultTo('');
    table.string('youtube').notNullable().defaultTo('');
    table.string('picture_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pols');
};
