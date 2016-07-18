'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users')

const auth = function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

router.get('/users', (_req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('users')
    .where('id', id)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', ev(validations.post), (req, res, next) => {
  const userInfo = req.body;

  knex('users')
    .where('email', userInfo.email)
    .then((users) => {
      if (users.length > 0) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send('Email already exists')
      }

      bcrypt.hash(userInfo.password, 12, (hashErr, hashed_password) => {
        if (hashErr) {
          next(hashErr)
        }

        knex('users')
          .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            hashed_password: hashed_password,
            city: req.body.city,
            state: req.body.state,
            party: req.body.party,
            bio: req.body.bio
          })
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            next(err);
          });
      });
    })
    .catch((err) => {
      next(err);
    });
  })

  router.patch('/users/:id', (req, res,next) => {
    knex('users')
      .update(req.body, '*')
      .where('id', req.params.id)
      .then((users) => {
        res.send(users[0]);
      })
      .catch((err) => {
        next(err);
      });
  });

  router.delete('/users/:id', (req, res, next) => {
    knex('users')
      .where('id', req.params.id)
      .first()
      .then((users) => {

      return knex('users')
        .del()
        .where('id', req.params.id)
        .then(() => {
          delete users.id;
          res.send(users)
        });

      })
      .catch((err) => {
        next(err);
      });
  });

  module.exports = router;
