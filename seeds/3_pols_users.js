'use strict';

exports.seed = function(knex) {
  return knex('pols_users').del()
  .then(() =>
    knex('pols_users').insert([{
      id: 1,
      pol_id: 1,
      user_id: 1,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 2,
      pol_id: 2,
      user_id: 1,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 3,
      pol_id: 33,
      user_id: 1,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 4,
      pol_id: 1,
      user_id: 2,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 5,
      pol_id: 90,
      user_id: 2,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 6,
      pol_id: 41,
      user_id: 4,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 7,
      pol_id: 15,
      user_id: 6,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 8,
      pol_id: 54,
      user_id: 1,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }, {
      id: 9,
      pol_id: 78,
      user_id: 4,
      created_at: new Date('2016-06-26 14:26:16 UTC'),
      updated_at: new Date('2016-06-26 14:26:16 UTC')
    }])
  )
  .then(() =>
    knex.raw(
      "SELECT setval('pols_users_id_seq', (SELECT MAX(id) FROM pols_users));"
    )
  );
};
