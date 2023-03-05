'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales_products',
      [
        {
          sale_id: 1,
          product_id: 1,
          quantity: 1,
        },
        {
          sale_id: 1,
          product_id: 2,
          quantity: 1,
        },
        {
          sale_id: 2,
          product_id: 7,
          quantity: 2,
        },
        {
          sale_id: 3,
          product_id: 4,
          quantity: 2,
        },
        {
          sale_id: 4,
          product_id: 1,
          quantity: 1,
        },
        {
          sale_id: 4,
          product_id: 2,
          quantity: 1,
        },
        {
          sale_id: 5,
          product_id: 7,
          quantity: 2,
        },
        {
          sale_id: 6,
          product_id: 4,
          quantity: 2,
        },
        {
          sale_id: 7,
          product_id: 1,
          quantity: 1,
        },
        {
          sale_id: 7,
          product_id: 2,
          quantity: 1,
        },
        {
          sale_id: 8,
          product_id: 7,
          quantity: 2,
        },
        {
          sale_id: 9,
          product_id: 4,
          quantity: 2,
        },
        {
          sale_id: 10,
          product_id: 4,
          quantity: 2,
        }
      ]
      );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
