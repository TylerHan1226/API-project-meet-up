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
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708405086/7rfrLoDLNdc0AQL0EDpG8oSjY74ypu3jBKQ7OvFb_shogcq.jpg',
        preview: true
      },
      {
        eventId: 1,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708405119/FKORL2022_0507_201540-_DIV_768x440-scaled_zppgb7.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708402503/group_img_-_03_rbbvp8.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708402631/group_img_-_04_xpev4w.jpg',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708402754/IMG_5193-1200x800_jf9cv9.webp',
        preview: false
      },
      {
        eventId: 2,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708402691/group_img_-_05_ju9ccd.jpg',
        preview: false
      },
      {
        eventId: 3,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708403276/MTU4MDE3MzkyOTY0ODA2MzU3_s6p91s.webp',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708404765/group_img_-08_r4pzne.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708404831/group_img_-10_vao7s2.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708404860/group_img_-11_ynppa5.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708404898/group_img_-12_wh7ptg.jpg',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708404926/group_img_-13_ffy5gb.jpg',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708405006/group_img_-_14_yyt8tc.jpg',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://res.cloudinary.com/do8l6gpqp/image/upload/v1708405042/group_img_-15_xcln4a.jpg',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://chthonic.tw/wp-content/uploads/2018/09/20180324-0I2A2239_resized.jpg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://cdn.media.amplience.net/i/metallica/2023-08aug25_hero_v2?fmt=auto&maxW=2400',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://m.psecn.photoshelter.com/img-get/I0000l8HWHfKAKzk/s/750/750/Chthonic-Concert-26Dec10-127-2.jpg',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://www.decibelmagazine.com/wp-content/uploads/2018/10/deciblog-cthonic-band.jpg',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2020/03/log2019-1.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://i.ytimg.com/vi/37tDWV7dOs8/maxresdefault.jpg',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://images.radio.com/aiu-media/LOG0905210001-766b1d7d-ba3a-40ae-a8c3-9883875ece19.jpg?width=800',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://seated.imgix.net/194689fa-7619-45cc-aad3-2a2aae90b444/Lamb%20of%20God%202%20-%20Travis%20Shinn.jpg',
        preview: false
      },
      {
        eventId: 9,
        url: 'https://www.welikela.com/wp-content/uploads/2018/04/getty-center.jpg',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://metropolismag.com/wp-content/uploads/2023/03/6678_100CSS.jpg',
        preview: false
      },
      {
        eventId: 9,
        url: 'https://images.adsttc.com/media/images/571d/aeb8/e58e/cea6/1200/0003/large_jpg/4.jpg?1461563047',
        preview: false
      },
      {
        eventId: 10,
        url: 'https://picturepark.cdn.herzogdemeuron.com/v/Uow366Ms/',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_56_leonard_handdem_12.jpg?itok=AT1GOYrF',
        preview: false
      },
      {
        eventId: 11,
        url: 'https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/1280x720/news/uploads/2024/01/Inter-miami-vs-al-nassr.jpg.webp',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2023-07/cristiano%20ronaldo%20al%20nassr%202023-2024.jpg?itok=bCKfLjOf',
        preview: false
      },
      {
        eventId: 11,
        url: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2023-10/Anderson%20Talisca%20Cristiano%20Ronaldo%20Sadio%20Mane%20Al%20Nassr%20082223.jpg?itok=SZcCpaS2',
        preview: false
      },
      {
        eventId: 11,
        url: 'https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/mls/mw7mkvf1izroq26hplg8.jpg',
        preview: false
      },
      {
        eventId: 12,
        url: 'https://images.mlssoccer.com/image/private/t_q-best/mls-mia-prd/oxbpfzbxdgmdborrym2w.png',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://frontofficesports.com/wp-content/uploads/2023/07/USATSI_18721872-scaled.jpg?quality=100',
        preview: false
      },
      {
        eventId: 12,
        url: 'https://cdn.vox-cdn.com/thumbor/Z1lHI-ZpI2JOA6axo0LU9vDsEjU=/0x0:4000x2667/1200x800/filters:focal(1697x104:2337x744)/cdn.vox-cdn.com/uploads/chorus_image/image/73099716/1970073737.0.jpg',
        preview: false
      },
      {
        eventId: 12,
        url: 'https://www.globaltimes.cn/Portals/0/attachment/2022/2022-07-20/b1504bd3-2354-4f14-9832-80794d88a08d.jpeg',
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
