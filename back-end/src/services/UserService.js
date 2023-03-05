const bcrypt = require('bcrypt');
const { User } = require('../database/models');

const loginService = async ({ email, password }) => {
  const userFound = await User.findOne({
    where: { email },
  });
  
  if (!userFound) throw new Error('User not found');

  if (!bcrypt.compare(password, userFound.password)) {
    throw new Error('User not found');
  }

  return userFound;
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
};

async function getSellerById(id) {
  try {
    const seller = await User.findOne({ where: { id } });
    return seller;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getSellerById,
  loginService,
  getAllSellers,
};
