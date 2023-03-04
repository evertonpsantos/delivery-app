const { Product } = require('../database/models');
// const { NO_REGISTRED_PRODUCTS } = require('../messages/errorMessages');

const findAllProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

module.exports = {
  findAllProducts,
};
