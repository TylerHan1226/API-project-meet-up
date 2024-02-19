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
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708383842/Lost_Lands_2023_Pics_14_hea0ws.jpg',
        preview: true
      },
      {
        groupId: 1,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708384021/excision-800x500_d2z8ah.jpg',
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
        groupId: 2,
        url: 'https://dotesports.com/wp-content/uploads/2023/08/lol-lcs-c9-summer-2023.jpg?w=1200',
        preview: false
      },
      {
        groupId: 2,
        url: 'https://news.cgtn.com/news/3d3d514f35676a4e30457a6333566d54/img/4d59a7559c6a432d9368e21427b57aef/4d59a7559c6a432d9368e21427b57aef.jpg',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://pbs.twimg.com/media/F9Kb2DebYAANapZ.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://m.media-amazon.com/images/M/MV5BZWQ1OGFhYjUtNTZhNy00YTE5LTlkZWItZTQzNmFkYjYxMjVkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://img.olympics.com/images/image/private/t_s_w960/t_s_16_9_g_auto/f_auto/primary/c5r52rbifxn2srhp9no0',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://phantom-marca.unidadeditorial.es/24314b937c09bc1b0e6a37571a9523a7/resize/828/f/jpg/assets/multimedia/imagenes/2021/08/31/16303964956430.jpg',
        preview: false
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
      {
        groupId: 5,
        url: 'https://arquitecturaviva.com/assets/uploads/articulos/75507/av_216506.webp?h=c1772bd3',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://phantom-marca.unidadeditorial.es/37ff1e724214ec3dd592df649f619236/resize/828/f/jpg/assets/multimedia/imagenes/2023/10/10/16969735691191.jpg',
        preview: true
      },
      {
        groupId: 6,
        url: 'https://media.newyorker.com/photos/64bc4330ef09d4a0e04cb249/master/pass/Rosen-Messi-Miami.jpg',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2024/01/30/15cac11e-b1d0-4e76-9c79-f788ad78b621_ead6c92e.jpg?itok=4lUczIMZ&v=1706580991',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://prod-media.beinsports.com/image/1687530750487_f6e445ae-0033-49dc-99e5-d1b395cf7c42.1920.JPG?ver=09-01-2024',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://cdn1.intermiami.news/uploads/52/2023/10/GettyImages-1710638816-1140x760.jpg',
        preview: false
      },
      {
        groupId: 6,
        url: 'https://www.sportico.com/wp-content/uploads/2023/08/GettyImages-1610631306-e1692977726690.jpg?w=1280&h=720&crop=1',
        preview: false
      }
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
