const { Sale, SalesProducts } = require('../database/models/index');

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
      const result = await Sale.findOne({ where: { id } });
      return result;
    } catch (error) {
      return error.message;
    }
}

const registerNewSale = async (saleInfo) => {
  const newSale = await Sale
    .create({ ...saleInfo, status: 'Pendente' });
  await Promise.all(saleInfo.cartItems
    .map((item) => SalesProducts
      .create({ saleId: newSale.id, productId: item.id, quantity: item.quantity })));

  return newSale;
};

const getAllSales = async () => {
  const allSales = await Sale.findAll();
  return allSales;
};

async function findSaleBySeller(id) {
  try {
    const result = await Sale.findAll({ where: { sellerId: id } });
    return result;
  } catch (error) {
    return error.message;
  }
}

async function updateSaleStatus(id, status) {
  await Sale.update({ status }, { where: { id } });
}

module.exports = {
  findSaleBySeller,
  findUserSales,
  findSale,
  registerNewSale,
  getAllSales,
  updateSaleStatus,
};
