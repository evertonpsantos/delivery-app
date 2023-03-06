const salesProductsService = require('../services/salesProductsService');

async function findSaleAndProduct(req, res) {
  const { id } = req.params;

  try {
    const result = await salesProductsService.findSaleAndProduct(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  findSaleAndProduct,
};
