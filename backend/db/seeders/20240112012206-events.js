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
        startDate: '2023-05-01 16:00:00',
        endDate: '2023-05-03 23:30:00'
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
        description: "Corey Taylor, the lead singer of Des Moines favorite heavy metal band Slipknot, returns to his hometown!",
        type: 'In person',
        capacity: 1500,
        price: 80,
        startDate: '2023-11-01 22:00:00',
        endDate: '2023-11-02 22:00:00'
      },
      {//eventId: 7
        venueId: 10,
        groupId: 4,
        name: 'Chthonic: Final Battle at Sing Ling Temple',
        description: "Sing-Ling temple is the most essential scene in Chthonic's latest 3 albums, where the final battle took place between the Puli aboriginal and the invaders.",
        type: 'In person',
        capacity: 1000,
        price: 150,
        startDate: '2024-12-20 20:00:00',
        endDate: '2024-12-20 22:00:00'
      },
      {//eventId: 8
        venueId: 10,
        groupId: 4,
        name: "Headbanger's Boat 2024",
        description: "Heavy Metal thrashes through the high seas October 28 - November 1, 2024 aboard Norwegian Gem!",
        type: 'In person',
        capacity: 200,
        price: 250,
        startDate: '2024-10-28 12:00:00',
        endDate: '2024-11-01 22:00:00'
      },
      { //eventId: 9
        venueId: 7,
        groupId: 5,
        name: 'Los Angeles Museum tour',
        description: "LA Museum Tour: 2-day architectural odyssey, discover iconic museums!",
        type: 'In person',
        capacity: 20,
        price: 200,
        startDate: '2024-12-01 08:00:00',
        endDate: '2024-12-02 19:00:00'
      },
      { //eventId: 10
        venueId: 8,
        groupId: 5,
        name: 'NYC Architecture Tour',
        description: "A great opportunity to explore great architecture in NYC with professionals",
        type: 'In person',
        capacity: 15,
        price: 240,
        startDate: '2023-10-01 8:00:00',
        endDate: '2023-10-01 20:00:00'
      },
      { //eventId: 11
        venueId: 9,
        groupId: 6,
        name: 'Inter Miami vs Al-Nassr',
        description: "This is another reunion of Cristiano Ronaldo and Lionel Messi, leading their respective teams to determine the superior one.",
        type: 'In person',
        capacity: 21000,
        price: 500,
        startDate: '2024-06-01 18:30:00',
        endDate: '2024-06-01 21:30:00'
      },
      { //eventId: 12
        venueId: 9,
        groupId: 6,
        name: 'Inter Miami vs FC Barcelona',
        description: "Messi will be facing his former club, where he grew up as a star and leader",
        type: 'In person',
        capacity: 21000,
        price: 1000,
        startDate: '2024-06-19 12:30:00',
        endDate: '2024-06-19 15:30:00'
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