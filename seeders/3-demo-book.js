'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "books",
      [
        {
          title: "A Smarter Way to Learn Javascript",
          author: "Mark Myers",
          categoryId: 4,
          userId: 1,
          publication: 2013,
          page: 288,
          isbn: "1497408180",
          about: "Learning javascript can be a hell",
          file: "javascript.epub",
          thumbnail: "https://m.media-amazon.com/images/I/51MLPPvesNL.jpg",
          status: "Approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Slash",
          author: "Slash",
          categoryId: 3,
          userId: 1,
          publication: 2008,
          page: 505,
          isbn: "0061351431",
          about: "One of the greatest rock guitarist",
          file: "slash.epub",
          thumbnail: "https://m.media-amazon.com/images/I/51t3N+TJHnL.jpg",
          status: "Approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};
