'use strict';

/** @type {import('sequelize-cli').Migration} */

const { GroupImage } = require('../models');

let options = { tableName: 'GroupImages'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupImage.bulkCreate([
      {
        groupId: 1,
        url: 'https://www.lostlandsfestival.com/wp-content/uploads/2023/10/Lost_Lands_2023_Pics_14.jpg',
        preview: true
      },
      {
        groupId: 1,
        url: 'https://images.ctfassets.net/meiq8c2ukzgo/6O0aD53ikQ8hEv0fIkZfLT/7300c8a25ecd6a512d517febc90779f6/excision-800x500.jpg?w=1200&h=627&q=90&fit=thumb&fm=jpg&f=center',
        preview: false
      },
      {
        groupId: 1,
        url: 'https://www.musicconnection.com/wp-content/uploads/2020/06/Studio-Roundtable-Jessica-Audiffred1-620x420.jpg',
        preview: false
      },
      {
        groupId: 1,
        url: 'https://i.ytimg.com/vi/-U5skjKD-8Q/sddefault.jpg?v=64ee5a2a',
        preview: false
      },
      {
        groupId: 1,
        url: 'https://consciouselectronic.com/wp-content/uploads/2018/07/20449025_2051349805151171_8272823064216598310_o-1.jpg',
        preview: false
      },
      {
        groupId: 1,
        url: 'https://edm.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU5Njc5MDg2MDE1MjkyNjMw/atliens-atl.jpg',
        preview: false
      },
      {
        groupId: 2,
        url: 'https://static.invenglobal.com/upload/image/2017/02/22/i1487753623863997.jpeg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://www.si.com/college/recruiting/basketball/the-professor-grayson-boucher-and1-mixtape-streetball-social-injustice-racism',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://suchan23.files.wordpress.com/2010/10/him_036.jpg',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://i.ytimg.com/vi/dymAGwL2kQI/maxresdefault.jpg',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://lh3.googleusercontent.com/-QkuIHNegWvisTuPZF-Md7Ot16hDSEw2cdsfa388L7dr_a3qMJsbwqxeugX48HDE-iHK6SEidvMIRbgc=w2880-h1200-p-l90-rj',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2022/08/Nightwish-2022.jpg',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://underground-england.com/wp-content/uploads/2021/12/X-JAPAN-BLOG.jpg',
        preview: false
      },
      {
        groupId: 5,
        url: 'https://www.tripsavvy.com/thmb/GsWkeg3Z1dPlB5ercleP7FxtxJI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/KusamainfinityroomGettyImages-539583358-09d09da8beb941c1b34e921c3ef5d995.jpg',
        preview: true
      },
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
