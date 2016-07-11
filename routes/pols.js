'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/pols', (_req, res, next) => {
  knex('pols')
    .orderBy('id')
    .then((pols) => {
      res.send(pols);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pols/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('pols')
    .where('id', id)
    .first()
    .then((pol) => {
      if (!pol) {
        return next();
      }

      res.send(pol);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
