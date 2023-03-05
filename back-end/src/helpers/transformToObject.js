const userService = require('../services/UserService');

const transformToObject = async (sale, product, quantity) => {
  const priceProduct = parseFloat(product.price).toFixed(2);
  const totalPriceSale = parseFloat(sale.totalPrice).toFixed(2).toString().replace('.', ',');
  const sellerById = await userService.getSellerById(sale.sellerId);
  const obj = {
    id: sale.id,
    seller: sellerById.name,
    totalPrice: totalPriceSale,
    saleDate: sale.saleDate,
    status: sale.status,
    name: product.name,
    price: priceProduct,
    quantity,
  };
  return obj;
};

module.exports = transformToObject;
