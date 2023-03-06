'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 9.70,
        delivery_address: 'Rua A',
        delivery_number: '000',
        sale_date: '2022-12-18 00:00:00',
        status: 'Pendente',
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 9.98,
        delivery_address: 'Rua B',
        delivery_number: '999999999',
        sale_date: '2022-12-18 00:00:00',
        status: 'Entregue',
      },
      {
        id: 3,
        user_id: 3,
        seller_id: 2,
        total_price: 15.00,
        delivery_address: 'Rua C',
        delivery_number: '999999999',
        sale_date: '2022-12-18 00:00:00',
        status: 'Preparando',
      },
      ]
      );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
