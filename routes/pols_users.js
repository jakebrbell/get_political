'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/pols/users', (req, res, next) => {
  knex('users')
    .innerJoin('pols_users', 'pols_users.user_id', 'users.id')
    .where('pols_users.user_id', req.session.userId)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
