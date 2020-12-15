'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Fantasy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sci-Fi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Biography',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Computer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
