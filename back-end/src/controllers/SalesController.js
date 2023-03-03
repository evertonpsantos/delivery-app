const { registerNewSale, getAllSales } = require('../services/SalesService');

const registerSale = async (req, res) => {
    const result = await registerNewSale(req.body);
    return res.status(200).json(result);
};

const getSales = async (req, res) => {
  const result = await getAllSales();
  return res.status(200).json(result);
};

module.exports = { registerSale, getSales };