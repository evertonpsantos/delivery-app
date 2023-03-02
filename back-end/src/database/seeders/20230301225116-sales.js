'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 20.00,
        delivery_address: 'Rua A',
        delivery_number: '000',
        sale_date: '2022-12-18',
        status: 'pendente',
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 20.00,
        delivery_address: 'Rua B',
        delivery_number: '999999999',
        sale_date: '2022-12-18',
        status: 'preparando',
      },
      {
        id: 3,
        user_id: 3,
        seller_id: 2,
        total_price: 20.00,
        delivery_address: 'Rua C',
        delivery_number: '999999999',
        sale_date: '2022-12-18',
        status: 'entregue',
      },
      {
        id: 4,
        user_id: 3,
        seller_id: 2,
        total_price: 20.00,
        delivery_address: 'Rua D',
        delivery_number: '999999999',
        sale_date: '2022-12-18',
        status: 'entregue',
      },
      {
        id: 5,
        user_id: 3,
        seller_id: 2,
        total_price: 20.00,
        delivery_address: 'Rua F',
        delivery_number: '999999999',
        sale_date: '2022-12-18',
        status: 'pendente',
      },
      ]
      );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
