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
      about: "Welcome to EDM Squad, LA's hub for electronic music lovers! Immerse in the electrifying world of EDM, where bass drops and synths create unforgettable moments. Join us to amplify LA's electronic scene, uniting enthusiasts for epic memories and live events.",
      type: 'In person',
      private: false,
      city: 'Los Angeles',
      state: 'California'
    },
    {
      organizerId: 2,
      name: 'The Best 5',
      about: "Welcome to The Best 5 - a community of passionate League of Legends players. Join us for weekend battles, where strategy, teamwork, and skill collide on the Summoner's Rift. Embark on a journey of epic clashes, unforgettable plays, and the sweet taste of victory in the ever-evolving world of League of Legends.",
      type: 'Online',
      private: false,
      city: 'Cincinnati',
      state: 'Ohio'
    },
    {
      organizerId: 3,
      name: "NYC Ballers' Expedition",
      about: "Join NYC Ballers' Expedition, where we explore the best street basketball spots in NYC! Gather with fellow enthusiasts for weekend events, unwind, and enjoy the thrill of hoops. Let's turn NYC's concrete into our playground. Lace up, play hard, and have a ball!",
      type: 'In person',
      private: false,
      city: 'New York City',
      state: 'New York'
    },
    {
      organizerId: 4,
      name: 'Metalheads',
      about: "Welcome to Metalheads, where the power of metal unites. Dive into diverse genres, form bands, and connect with fellow enthusiasts. Whether you're a player or fan, join us for epic jam nights, workshops, and gigs. Let's amplify the metal scene and forge our legacy together.",
      type: 'In person',
      private: false,
      city: 'San Francisco',
      state: 'California'
    },
    {
      organizerId: 5,
      name: 'Architecture Explorers',
      about: "Discover LA's architectural marvels with Architecture Explorers! Join our tours showcasing iconic designs and historical treasures. Immerse in the art and stories shaping the city's skyline. Let's explore together!",
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
