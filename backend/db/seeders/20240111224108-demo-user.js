'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {tableName: 'Users'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'user1@user.io',
        username: 'User1',
        firstName: 'Tyler',
        lastName: 'Han',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'User2',
        firstName: 'Chris',
        lastName: 'Lin',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'User3',
        firstName: 'Alphonso',
        lastName: 'Davies',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'User4',
        firstName: 'Corey',
        lastName: 'Taylor',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        username: 'User5',
        firstName: 'Tony',
        lastName: 'Han',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        username: 'User6',
        firstName: 'Joey',
        lastName: 'Jordison',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user7@user.io',
        username: 'User7',
        firstName: 'Jesse',
        lastName: 'Liu',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        username: 'User8',
        firstName: 'Marilyn',
        lastName: 'Manson',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'user9@user.io',
        username: 'User9',
        firstName: 'Jeff',
        lastName: 'Abel',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'user10@user.io',
        username: 'User10',
        firstName: 'Jessica',
        lastName: 'Audiffred',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    // options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8', 'User9', 'User10'] }
    }, {});
  }
};