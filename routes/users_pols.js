'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const knex = require('../knex');

const checkAuth = function(req, res, next) {
  if (!req.session.userId) {
    return res.sendStatus(401);
  }

  next();
};

router.get('/users/pols', checkAuth, (req, res, next) => {
  knex('pols')
    .innerJoin('pols_users', 'pols_users.pol_id', 'pols.id')
    .where('pols_users.user_id', req.session.userId)
    .then((pols) => {
      res.send(pols);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/pols/:polId', checkAuth, (req, res, next) => {
  const polId = Number.parseInt(req.params.polId);

  if (Number.isNaN(polId)) {
    return next();
  }

  knex('pols')
    .where('id', polId)
    .first()
    .then((pol) => {
      if (!pol) {
        return next();
      }

      return knex('pols_users')
        .insert({
          user_id: req.session.userId,
          pol_id: polId
        }, '*')
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users/pols/:polId', checkAuth, (req, res, next) => {
  const polId = Number.parseInt(req.params.polId);

  if (Number.isNaN(polId)) {
    return next();
  }

  knex('pols_users')
    .where({
      user_id: req.session.userId,
      pol_id: polId
    })
    .first()
    .then((user_pol) => {
      if (!user_pol) {
        return next();
      }

      return knex('pols_users')
        .del()
        .where({
          user_id: req.session.userId,
          pol_id: polId
        })
        .then(() => {
          delete user_pol.id;
          res.send(user_pol);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
