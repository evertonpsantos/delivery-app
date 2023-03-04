const { Product } = require('../database/models/index');

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
  findProduct,
};
