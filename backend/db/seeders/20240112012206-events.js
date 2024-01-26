'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Event } = require('../models');

let options = { tableName: 'Events' };
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        venueId: 1,
        groupId: 1,
        name: 'Zombieland - Apocalypse',
        description: "Zombieland: 4 bass stages, a symbol of humanity's triumph!",
        type: 'In person',
        capacity: 15000,
        price: 180,
        startDate: '2024-05-01 16:00:00',
        endDate: '2024-05-03 23:30:00'
      },
      {
        venueId: 2,
        groupId: 1,
        name: 'Lost Lands',
        description: 'Lost Lands: Primal beats, stunning visuals, EDM escape!',
        type: 'In person',
        capacity: 25000,
        price: 120,
        startDate: '2024-07-01 13:00:00',
        endDate: '2024-07-03 23:30:00'
      },
      {
        venueId: 3,
        groupId: 1,
        name: 'Electric Zoo',
        description: "Electric Zoo: NYC electronic music fest, Labor Day wkd, Randall's Island.",
        type: 'In person',
        capacity: 42500,
        price: 280,
        startDate: '2024-07-08 12:00:00',
        endDate: '2024-07-09 22:30:00'
      },
      {
        venueId: 4,
        groupId: 2,
        name: 'Rift Tournament',
        description: 'Rift Tournament: Join online, clash in thrilling battles!',
        type: 'Online',
        capacity: 20,
        price: 5,
        startDate: '2024-08-01 20:00:00',
        endDate: '2024-08-02 23:30:00'
      },
      {
        venueId: 5,
        groupId: 3,
        name: 'The Harlem League',
        description: 'Harlem League: Ball, compete, win $100, forge bonds!',
        type: 'In person',
        capacity: 32,
        price: 5,
        startDate: '2024-10-01 20:00:00',
        endDate: '2024-10-01 22:00:00'
      },
      {
        venueId: 6,
        groupId: 4,
        name: 'Made in Iowa',
        description: "Metal Extravaganza: Raw energy, intense riffs, headbanging vibes!",
        type: 'In person',
        capacity: 200,
        price: 60,
        startDate: '2024-11-01 22:00:00',
        endDate: '2023-11-02 22:00:00'
      },
      {
        venueId: 7,
        groupId: 5,
        name: 'Los Angeles Museum tour',
        description: "LA Museum Tour: 3-day architectural odyssey, discover iconic museums!",
        type: 'In person',
        capacity: 10,
        price: 125,
        startDate: '2024-12-01 08:00:00',
        endDate: '2024-12-01 19:00:00'
      },
      {
        venueId: 8,
        groupId: 5,
        name: 'Los Angeles Museum tour',
        description: "LA Museum Tour: 3-day architectural odyssey, discover iconic museums!",
        type: 'In person',
        capacity: 10,
        price: 125,
        startDate: '2024-12-01 08:00:00',
        endDate: '2024-12-01 19:00:00'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};