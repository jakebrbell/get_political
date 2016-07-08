'use strict';

const environment = process.env.NODE_ENV || 'develeopment';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
