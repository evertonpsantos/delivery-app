const { Product } = require('../database/models');
// const { NO_REGISTRED_PRODUCTS } = require('../messages/errorMessages');

const findAllProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

async function findProduct(id) {
    try {
      const result = await Product.findOne({ where: { id },
        attributes: ['name', 'price', 'urlImage'] });
      return result;
    } catch (error) {
      return error.message;
    }
}

module.exports = {
  findAllProducts,
  findProduct,
};
