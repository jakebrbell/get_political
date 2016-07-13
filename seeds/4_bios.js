'use strict';

const bios = require('../bios.json');
const Promise = require('bluebird');

exports.seed = function(knex) {

  const insertBios = function(bioObj) {
    return knex('pols')
      .where('bioguide_id', bioObj.bioguide_id)
      .update({bio: bioObj.bio})
      .catch((err) => {
        throw err;
      });
  };

  return Promise.map(bios, (bioObj) => insertBios(bioObj))
    .then(() => {
      return knex('pols')
        .where('name', 'Barack Obama')
        .update({bio: 'Barack Obama, 44th President of the United States and former Senator from Illinois; born in Honolulu, Hawaii, August 4, 1961; obtained early education in Jakarta, Indonesia, and Hawaii; continued education at Occidental College, Los Angeles, Calif.; received a B.A. in 1983 from Columbia University, New York City; worked as a community organizer in Chicago, Ill.; studied law at Harvard University, where he became the first African American president of the Harvard Law Review, and received J.D. in 1991; lecturer on constitutional law, University of Chicago; member, Illinois State senate 1997-2004; elected as a Democrat to the U.S. Senate in 2004, and served from January 3, 2005, to November 16, 2008, when he resigned from office, having been elected president; elected as the 44th President of the United States on November 4, 2008, and was inaugurated on January 20, 2009.'})
      .then(() => {
        return knex('pols')
          .where('name', 'Joseph R. Biden')
          .update({bio: 'Joseph R. Biden, Vice President of the United States and former Senator from Delaware; born in Scranton, Lackawanna County, Pa., November 20, 1942; educated at St. Helena’s School, Wilmington, Del., and Archmere Academy, Claymont, Del.; graduated, University of Delaware, Newark, 1965, and Syracuse (N.Y.) University College of Law 1968; admitted to the Delaware bar in 1969 and commenced practice in Wilmington; served on the New Castle County Council 1970-1972; elected as a Democrat to the United States Senate in 1972 and reelected in 1978, 1984, 1990, 1996, 2002, and again in 2008 and served from January 3, 1973, until January 15, 2009, when he resigned to become Vice President; chair, Committee on the Judiciary (One Hundredth through One Hundred Third Congresses), Committee on Foreign Relations (One Hundred Seventh Congress [January 3-20, 2001; June 6, 2001-January 3, 2003], One Hundred Tenth Congress); was an unsuccessful candidate for Democratic nomination for president in 2008, but was elected Vice President of the United States on the Democratic ticket headed by Barack Obama, and was inaugurated on January 20, 2009.'})
      })
    })
};
