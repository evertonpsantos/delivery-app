const { Sale, SalesProducts } = require('../database/models');

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

module.exports = {
  registerNewSale, getAllSales,
};