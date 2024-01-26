'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Attendance } = require('../models');
let options = { tableName: 'Attendances'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Attendance.bulkCreate([
      {
        eventId: 1,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 6,
        status: 'pending'
      },
      {
        eventId: 1,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 1,
        userId: 10,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 6,
        status: 'pending'
      },
      {
        eventId: 2,
        userId: 7,
        status: 'pending'
      },
      {
        eventId: 2,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 10,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 9,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 4,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 5,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 5,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 4,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 2,
        status: 'pending'
      },
      {
        eventId: 6,
        userId: 6,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 7,
        status: 'attending'
      },
      {
        eventId: 6,
        userId: 8,
        status: 'attending'
      },
      {
        eventId: 7,
        userId: 5,
        status: 'attending'
      },
      {
        eventId: 7,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 7,
        userId: 10,
        status: 'pending'
      },
      {
        eventId: 8,
        userId: 1,
        status: 'attending'
      }     
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10] }
    }, {});
  }
};
