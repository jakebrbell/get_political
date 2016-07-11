
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('party').notNullable().defaultTo('');
    table.text('bio').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.specificType('state', 'char(2)').notNullable().defaultTo('');
    table.string('picture_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
