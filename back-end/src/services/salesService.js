const { Sale } = require('../database/models/index');

async function findUserSales(id) {
  try {
    const result = await Sale.findAll({ where: { userId: id } });
    return result;
  } catch (error) {
    return error.message;
  }
}

async function findSale(id) {
    try {
      const result = await Sale.findOne({ where: { id },
        attributes: ['id', 'totalPrice', 'saleDate', 'status'] });
      return result;
    } catch (error) {
      return error.message;
    }
}

module.exports = {
  findUserSales,
  findSale,
};
