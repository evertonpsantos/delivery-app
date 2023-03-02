const { Sale } = require('../database/models/index');

async function findAll() {
  try {
    const result = await Sale.findAll();
    return result;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  findAll,
};
