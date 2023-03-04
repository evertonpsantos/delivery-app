'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales_products',
      [
        {
          sale_id: 1,
          product_id: 2,
          quantity: 2,
        },
        {
          sale_id: 1,
          product_id: 1,
          quantity: 3,
        },
        {
          sale_id: 2,
          product_id: 3,
          quantity: 5,
        }
      ]
      );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
