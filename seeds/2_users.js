'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '1@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        first_name: 'Arnie',
        last_name: 'shwarze',
        email: '2@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Democrat',
        bio: 'Bio #2',
        city: 'Bellevue',
        state: 'WA',
        picture_url: 'http://www.bzb.ro/files/images/Arnold-Schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        first_name: 'Arn',
        last_name: 'shwart',
        email: '3@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #3',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://4.bp.blogspot.com/-gGz9LhCg2yQ/TwdVFbbjtYI/AAAAAAAAAyA/y9HSKuCvlWE/s1600/Arnold+Schwarzenegger+2.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        first_name: 'A',
        last_name: 'S',
        email: '4@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #4',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://i.huffpost.com/gen/1577038/images/o-ARNOLD-SCHWARZENEGGER-facebook.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '5@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 6,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '6@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 7,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '7@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 8,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '8@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 9,
        first_name: 'Arnold',
        last_name: 'shwarzenegger',
        email: '9@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        party: 'Republican',
        bio: 'Bio #1',
        city: 'Seattle',
        state: 'WA',
        picture_url: 'http://www.edgemagazine.org/wp-content/uploads/2015/10/arnold-schwarzenegger.jpg',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
      "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
  };
