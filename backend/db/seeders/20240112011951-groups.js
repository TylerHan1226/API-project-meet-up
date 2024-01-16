'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Group } = require('../models');

let options = { tableName: 'Groups'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   await Group.bulkCreate([
    {
      organizerId: 1,
      name: 'EDM Squad',
      about: "Immerse in LA's EDM scene at EDM Squad! Join us for unforgettable nights of music, dance, and camaraderie. Whether a seasoned raver or newbie, amplify the rhythm together!",
      type: 'In person',
      private: false,
      city: 'Los Angeles',
      state: 'CA'
    },
    {
      organizerId: 2,
      name: 'The Best 5',
      about: "Welcome to 'The Best 5' - Dive into epic League of Legends battles on Summoner's Rift. Join our community for unforgettable plays and the pursuit of victory!",
      type: 'Online',
      private: false,
      city: 'Cincinnati',
      state: 'OH'
    },
    {
      organizerId: 3,
      name: "NYC Ballers' Expedition",
      about: "NYC Ballers' Expedition: Discover prime basketball spots, add excitement to weekend hoops adventures. Join us for camaraderie and urban court exploration!",
      type: 'In person',
      private: false,
      city: 'New York City',
      state: 'NY'
    },
    {
      organizerId: 4,
      name: 'Metalheads',
      about: "Metalheads unite! Dive into genres, form bands, and amplify the metal scene. Join us for epic jam nights and forge our legacy together.",
      type: 'In person',
      private: false,
      city: 'San Francisco',
      state: 'CA'
    },
    {
      organizerId: 5,
      name: 'Architecture Explorers',
      about: "Discover LA's architectural marvels with Architecture Explorers!",
      type: 'In person',
      private: false,
      city: 'Los Angeles',
      state: 'CA'
    }
   ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      organizerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
    
  }
};
