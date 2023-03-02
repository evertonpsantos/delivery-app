const productsService = require('../services/ProductService');

const findAllProducts = async (_req, res) => {
   const allProducts = await productsService.findAllProducts();
    return res.status(200).json(allProducts);
};

module.exports = {
  findAllProducts,
};
