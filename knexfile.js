'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/get_political_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/get_political_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
