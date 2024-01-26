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
      },
      {
        groupId: 1,
        address: '7585 Kindle Rd',
        city: 'Legend Valley',
        state: 'OH',
        lat: 39.93972767215494, 
        lng: -82.40795216931674
      },
      {
        groupId: 1,
        address: '20 Randalls Island Park',
        city: 'New York',
        state: 'NY',
        lat: 40.79667394634237, 
        lng: -73.92283886507431
      },
      {
        groupId: 2,
        address: '12333 W Olympic Blvd',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.03280014054085,
        lng: -118.45735745150874
      },
      {
        groupId: 3,
        address: '280 W 155th St',
        city: 'New York',
        state: 'NY',
        lat: 40.829255852380655, 
        lng: -73.93618024723602
      },
      {
        groupId: 4,
        address: '707 Pavilion Blvd',
        city: 'Charlotte',
        state: 'NC',
        lat: 35.327371671144014, 
        lng: -80.71227570550349
      },
      {
        groupId: 5,
        address: '1200 Getty Center Dr',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.087956995679946,
        lng: -118.47566745911918
      },
      {
        groupId: 5,
        address: '1200 Getty Center Dr',
        city: 'Los Angeles',
        state: 'CA',
        lat: 34.087956995679946,
        lng: -118.47566745911918
      }
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
