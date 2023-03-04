const salesService = require('../services/salesService');

async function findAll(req, res) {
  const { id } = req.params;
  try {
    const result = await salesService.findUserSales(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  findAll,
};
