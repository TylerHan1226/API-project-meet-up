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
        description: 'Zombieland boasts four massive stages of bass that hold the key to salvaging our world! In this dark era, Apocalypse Fest becomes more than just an escape, becoming a symbol of resilience and the triumphant spirit of humanity.',
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
        description: 'Lost Lands: An EDM extravaganza where prehistoric beats collide with futuristic vibes. Immerse in the primal energy of bass, surrounded by stunning visuals and vibrant lights. Join thousands of fellow ravers for a journey through the EDM jungle. Unleash the beats, dance under the stars, and let Lost Lands be your ultimate electronic music escape.',
        type: 'In person',
        capacity: 25000,
        price: 220,
        startDate: '2024-07-01 13:00:00',
        endDate: '2024-07-03 23:30:00'
      },
      {
        venueId: 3,
        groupId: 2,
        name: 'Rift Tournament',
        description: 'Dive into the Rift Tournament, hosted by "The Best 5" on Meetup! Amateur League of Legends players, assemble online to form teams of five. Join the virtual arena, where strategy meets camaraderie. Spectate or participate as diverse groups clash for victory. Unleash your gaming prowess in thrilling battles!',
        type: 'Online',
        capacity: 20,
        price: 5,
        startDate: '2024-08-01 20:00:00',
        endDate: '2024-08-02 23:30:00'
      },
      {
        venueId: 4,
        groupId: 3,
        name: 'The Harlem League',
        description: 'Join "The Harlem League" for amateur ballers! Meet, form teams, and compete on the iconic Harlem field. With 4 teams of 8 players max, each event offers a chance to win $100. Unleash your skills, forge bonds, and be part of the Harlem balling legacy!',
        type: 'In person',
        capacity: 32,
        price: 5,
        startDate: '2024-10-01 20:00:00',
        endDate: '2024-10-01 22:00:00'
      },
      {
        venueId: 5,
        groupId: 4,
        name: 'Made in Iowa',
        description: "A metal music extravaganza featuring the Metalheads. Join fellow metal enthusiasts for a night of raw energy, intense riffs, and headbanging vibes. Professional and up-and-coming musicians unite for a concert that embodies the passion of Iowa's metal scene. Let the music ignite your soul!",
        type: 'In person',
        capacity: 200,
        price: 60,
        startDate: '2024-11-01 22:00:00',
        endDate: '2023-11-02 22:00:00'
      },
      {
        venueId: 6,
        groupId: 5,
        name: 'Los Angeles Museum tour',
        description: "Embark on a 3-day architectural odyssey with Los Angeles Museum Tour! Explore iconic museums like the Getty, the Broad, and more. Uncover the history, culture, and architectural marvels that shape LA's skyline. Join us for a journey of discovery and design appreciation.",
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