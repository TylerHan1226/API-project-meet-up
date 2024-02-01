'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Venue } = require('../models');

let options = { tableName: 'Venues'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Venue.bulkCreate([
      {
        groupId: 1,
        address: '1126 Queens Hwy',
        city: 'Los Angeles',
        state: 'CA',
        lat: 33.75275573889709,
        lng: -118.19029468561867
      }, //venueId: 1 
      {
        groupId: 1,
        address: '7585 Kindle Rd',
        city: 'Legend Valley',
        state: 'OH',
        lat: 39.93972767215494, 
        lng: -82.40795216931674
      }, //venueId: 2
      {
        groupId: 1,
        address: '20 Randalls Island Park',
        city: 'New York',
        state: 'NY',
        lat: 40.79667394634237, 
        lng: -73.92283886507431
      }, //venueId: 3
      {
        groupId: 2,
        address: '12333 W Olympic Blvd',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.03280014054085,
        lng: -118.45735745150874
      }, //venueId: 4
      {
        groupId: 3,
        address: '280 W 155th St',
        city: 'New York',
        state: 'NY',
        lat: 40.829255852380655, 
        lng: -73.93618024723602
      }, //venueId: 5
      {
        groupId: 4,
        address: '2100 NW 100th St',
        city: 'Clive',
        state: 'IA',
        lat: 41.613269797385215, 
        lng: -93.7572305312421
      }, //venueId: 6
      {
        groupId: 5,
        address: '1200 Getty Center Dr',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.087956995679946,
        lng: -118.47566745911918
      }, //venueId: 7
      {
        groupId: 5,
        address: '253 40 Bond',
        city: 'New York',
        state: 'NY',
        lat: 40.72636190580304,
        lng: -73.99303983081657
      }, //venueId: 8
      {
        groupId: 6,
        address: '1350 NW 55th St',
        city: 'Fort Lauderdale',
        state: 'FL',
        lat: 26.197226275335346,
        lng: -80.16113378633884
      },//venueId: 9 
      {
        groupId: 4,
        address: '1001 Stadium Dr',
        city: 'Inglewood',
        state: 'CA',
        lat: 33.95408806116594,
        lng: -118.33903959999999
      } //venueId: 10
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
