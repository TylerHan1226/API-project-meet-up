'use strict';

/** @type {import('sequelize-cli').Migration} */

const { EventImage } = require('../models');
let options = { tableName: 'EventImages'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await EventImage.bulkCreate([  
      {
        eventId: 1,
        url: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2023/11/23201341/7rfrLoDLNdc0AQL0EDpG8oSjY74ypu3jBKQ7OvFb.jpeg',
        preview: true
      },
      {
        eventId: 1,
        url: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/111/2023/05/23115444/FKORL2022_0507_201540-_DIV_768x440-scaled.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://www.lostlandsfestival.com/wp-content/uploads/2023/10/Lost_Lands_2023_Pics_16.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://www.lostlandsfestival.com/wp-content/uploads/2023/10/Lost_Lands_2023_Pics_7.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://www.lostlandsfestival.com/wp-content/uploads/2023/10/Lost_Lands_2023_Pics_12.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://cdn.shopify.com/s/files/1/0385/6229/files/IMG_5193-1200x800.jpg?v=1659494618',
        preview: false
      },
      {
        eventId: 3,
        url: 'https://edm.com/.image/ar_233:100%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_1920/MTU4MDE3MzkyOTY0ODA2MzU3/pic.webp',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://newsaf.cgtn.com/news/2021-11-07/Edward-Gaming-wins-2021-League-of-Legends-World-Championship-14YMbS1xCAE/img/8de275c285ad4e8d89a8932bd545b5bf/8de275c285ad4e8d89a8932bd545b5bf.png',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://lh3.googleusercontent.com/p/AF1QipPHEWs5_lbvHfgt9cH2TLGgbWM2z3tzj_6WuyQZ=s680-w680-h510',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://www.therockpit.net/wp-content/uploads/2022/03/Slipknot-3-16-2022-fargo-dome-1-of-1-1.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://distortedsoundmag.com/wp-content/uploads/2022/09/Lamb-Of-God-2022.jpg',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2019/09/chthonic-sail-into-the-sunsets-f.jpg',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://pbs.twimg.com/media/EofJKw0VEAIQ2H_.jpg',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Slipknot_concert_%28cropped%29.jpg/2560px-Slipknot_concert_%28cropped%29.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://www.welikela.com/wp-content/uploads/2018/04/getty-center.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://metropolismag.com/wp-content/uploads/2023/03/6678_100CSS.jpg',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://images.adsttc.com/media/images/571d/aeb8/e58e/cea6/1200/0003/large_jpg/4.jpg?1461563047',
        preview: false
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
