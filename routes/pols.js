'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const request = require('request-promise');

router.get('/pols', (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    const zip = Number.parseInt(req.query.zip);

    if (Number.isNaN(zip)) {
      return next();
    }

    request.get(`https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}&apikey=${process.env.SUNLIGHT_API}`)
      .then((response) => {
        const parsedResults = JSON.parse(response).results;

        const bioguide_ids = [];

        for (const pol of parsedResults) {
          bioguide_ids.push(pol.bioguide_id);
        }

        return(bioguide_ids);
      })
      .then((bioguide_ids) => {
        knex('pols')
          .where('bioguide_id', bioguide_ids[0])
          .orWhere('bioguide_id', bioguide_ids[1])
          .orWhere('bioguide_id', bioguide_ids[2])
          .then((pols) => {
            res.send(pols);
          })
          .catch((err) => {
            next(err);
          });
      })
  }
  else {
    knex('pols')
      .orderBy('id')
      .then((pols) => {
        res.send(pols);
      })
      .catch((err) => {
        next(err);
      });
  }
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
