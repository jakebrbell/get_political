'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const request = require('request-promise');

exports.seed = function(knex) {
  const pols = [];

  return knex('pols').del()
    .then(() => {
      return knex.raw("ALTER SEQUENCE pols_id_seq RESTART WITH 1;");
    })
    .then(() => {
      return request.get(`https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus?roles=headOfState&roles=deputyHeadOfGovernment&key=${process.env.GOOGLE_CIVIC_API}`)
    })
    .then((response) => {
      const pres = JSON.parse(response);

      for (let i = 0; i < pres.officials.length; i++) {
        let newPol = {
          name: pres.officials[i].name,
          title: pres.offices[i].name,
          state_name: '',
          district: '',
          party: pres.officials[i].party,
          street: '1600 Pennsylvania Avenue, NW',
          city: 'Washington',
          state: 'DC',
          zipcode: '20500',
          phone: pres.officials[i].phones[0],
          bioguide_id: '',
          picture_url: pres.officials[i].photoUrl
        };

        for (let j = 0; j < pres.officials[i].channels.length; j++) {

          if (pres.officials[i].channels[j].type === 'Facebook') {
            newPol.facebook = `https://www.facebook.com/${pres.officials[i].channels[j].id}`;
          }
          else if (pres.officials[i].channels[j].type === 'Twitter') {
            newPol.twitter = `https://www.twitter.com/${pres.officials[i].channels[j].id}`;
          }
          else if (pres.officials[i].channels[j].type === 'YouTube') {
            newPol.youtube = `https://www.youtube.com/${pres.officials[i].channels[j].id}`;
          }
        }

        pols.push(newPol)
      }
      return pols;
    })
    .then(() => {
      return request.get(`https://congress.api.sunlightfoundation.com/legislators?chamber=senate&per_page=all&apikey=${process.env.SUNLIGHT_API}`)
    })
    .then((response) => {
      const sens = JSON.parse(response).results;

      for (let i = 0; i < sens.length; i++) {
        let newPol = {
          name: `${sens[i].first_name} ${sens[i].last_name}`,
          title: sens[i].title,
          state_name: sens[i].state_name,
          district: '',
          party: sens[i].party,
          street: sens[i].office,
          city: 'Washington',
          state: 'DC',
          zipcode: '20510',
          phone: sens[i].phone,
          bioguide_id: sens[i].bioguide_id,
          picture_url: `https://theunitedstates.io/images/congress/225x275/${sens[i].bioguide_id}.jpg`
        };

        if (sens[i].facebook_id) {
          newPol.facebook = `https://www.facebook.com/${sens[i].facebook_id}`;
        }
        if (sens[i].twitter_id) {
          newPol.twitter = `https://www.twitter.com/${sens[i].twitter_id}`;
        }
        if (sens[i].youtube_id) {
          newPol.youtube = `https://www.youtube.com/${sens[i].youtube_id}`;
        }

        pols.push(newPol)
      }

      return pols;
    })
    .then(() => {
      return request.get(`https://congress.api.sunlightfoundation.com/legislators?chamber=house&per_page=all&apikey=${process.env.SUNLIGHT_API}`)
    })
    .then((response) => {
      const reps = JSON.parse(response).results;

      for (let i = 0; i < reps.length; i++) {
        let newPol = {
          name: `${reps[i].first_name} ${reps[i].last_name}`,
          title: reps[i].title,
          state_name: reps[i].state_name,
          district: reps[i].district,
          party: reps[i].party,
          city: 'Washington',
          state: 'DC',
          zipcode: '20515',
          bioguide_id: reps[i].bioguide_id,
          picture_url: `https://theunitedstates.io/images/congress/225x275/${reps[i].bioguide_id}.jpg`
        };

        if (reps[i].phone) {
          newPol.phone = reps[i].phone;
        }
        if (reps[i].office) {
          newPol.street = reps[i].office;
        }
        if (reps[i].facebook_id) {
          newPol.facebook = `https://www.facebook.com/${reps[i].facebook_id}`;
        }
        if (reps[i].twitter_id) {
          newPol.twitter = `https://www.twitter.com/${reps[i].twitter_id}`;
        }
        if (reps[i].youtube_id) {
          newPol.youtube = `https://www.youtube.com/${reps[i].youtube_id}`;
        }

        pols.push(newPol)
      }
      return pols;
    })
    .then(() => {
      return request.get(`https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus?roles=headOfState&roles=deputyHeadOfGovernment&key=${process.env.GOOGLE_CIVIC_API}`)
    })
    .then((response) => {
      const pres = JSON.parse(response);

      for (let i = 0; i < pres.officials.length; i++) {
        let newPol = {
          name: pres.officials[i].name,
          title: pres.offices[i].name,
          state_name: '',
          district: '',
          party: pres.officials[i].name,
          street: '1600 Pennsylvania Avenue, NW',
          city: 'Washington',
          state: 'DC',
          zipcode: '20500',
          phone: pres.officials[i].phones[0],
          bioguide_id: '',
          picture_url: pres.officials[i].photoUrl
        };

        for (let j = 0; j < pres.officials[i].channels.length; j++) {
          if (pres.officials[i].channels[j].type === 'Facebook') {
            newPol.facebook = `https://www.facebook.com/${pres.officials[i].channels[j].id}`;
          }
          else if (pres.officials[i].channels[j].type === 'Twitter') {
            newPol.twitter = `https://www.twitter.com/${pres.officials[i].channels[j].id}`;
          }
          else if (pres.officials[i].channels[j].type === 'YouTube') {
            newPol.youtube = `https://www.youtube.com/${pres.officials[i].channels[j].id}`;
          }
        }

        pols.push(newPol)
      }
      return pols;
    })
    .then(() => {
      return knex('pols').insert(pols);
    })
    .then(() => {
      return knex.raw("SELECT setval('pols_id_seq', (SELECT MAX(id) FROM pols));")
    });
};
