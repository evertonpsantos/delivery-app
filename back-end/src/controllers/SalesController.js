const salesService = require('../services/salesService');

const registerSale = async (req, res) => {
    const result = await salesService.registerNewSale(req.body);
    return res.status(201).json(result);
};

const getSales = async (req, res) => {
  const result = await salesService.getAllSales();
  return res.status(200).json(result);
};

async function findAll(req, res) {
  const { id } = req.params;
  try {
    const result = await salesService.findUserSales(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

async function findSaleBySeller(req, res) {
  const { id } = req.params;
  
  try {
    const result = await salesService.findSaleBySeller(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function updateSaleStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  await salesService.updateSaleStatus(id, status);
  return res.status(200).json({ message: 'Updated successfully' });
}

module.exports = { registerSale, getSales, findAll, findSaleBySeller, updateSaleStatus };
