const salesService = require('../services/salesService');

async function findAll(_req, res) {
  try {
    const result = await salesService.findAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  findAll,
};
