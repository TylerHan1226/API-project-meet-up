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
        username: 'Tyler_Han96',
        firstName: 'Tyler',
        lastName: 'Han',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'theShy',
        firstName: 'Seung-lok',
        lastName: 'Kang',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'LeDennis23',
        firstName: 'Dennis',
        lastName: 'Mah',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'Slipknot-no.8',
        firstName: 'Corey',
        lastName: 'Taylor',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        username: 'Tony1020',
        firstName: 'Tony',
        lastName: 'Han',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        username: 'Slipknot-no.1',
        firstName: 'Joey',
        lastName: 'Jordison',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user7@user.io',
        username: 'JesseBlack',
        firstName: 'Jesse',
        lastName: 'Liu',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        username: 'SweetDreams',
        firstName: 'Marilyn',
        lastName: 'Manson',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'user9@user.io',
        username: 'Excision',
        firstName: 'Jeff',
        lastName: 'Abel',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'user10@user.io',
        username: 'Jessica0406',
        firstName: 'Jessica',
        lastName: 'Audiffred',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        email: 'user11@user.io',
        username: 'Messi10',
        firstName: 'Lionel',
        lastName: 'Messi',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        email: 'user12@user.io',
        username: 'Suárez9',
        firstName: 'Luis',
        lastName: 'Suárez',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        email: 'user13@user.io',
        username: 'CDM No.1',
        firstName: 'Sergio',
        lastName: 'Busquets',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        email: 'user14@user.io',
        username: 'JA18',
        firstName: 'Jordi',
        lastName: 'Alba',
        hashedPassword: bcrypt.hashSync('password14')
      },
      {
        email: 'user15@user.io',
        username: 'Gavi8',
        firstName: 'Pablo',
        lastName: 'Gavi',
        hashedPassword: bcrypt.hashSync('password15')
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