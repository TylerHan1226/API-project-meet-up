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
      about: "Welcome to EDM Squad",
      type: 'In person',
      private: false,
      city: 'Los Angeles',
      state: 'California'
    },
    {
      organizerId: 2,
      name: 'The Best 5',
      about: "Welcome to The Best 5",
      type: 'Online',
      private: false,
      city: 'Cincinnati',
      state: 'Ohio'
    },
    {
      organizerId: 3,
      name: "NYC Ballers' Expedition",
      about: "Join NYC Ballers' Expedition",
      type: 'In person',
      private: false,
      city: 'New York City',
      state: 'New York'
    },
    {
      organizerId: 4,
      name: 'Metalheads',
      about: "Welcome to Metalheads",
      type: 'In person',
      private: false,
      city: 'San Francisco',
      state: 'California'
    },
    {
      organizerId: 5,
      name: 'Architecture Explorers',
      about: "Discover LA's architectural marvels with Architecture Explorers!",
      type: 'In person',
      private: false,
      city: 'Los Angeles',
      state: 'California'
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
