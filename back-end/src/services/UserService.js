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

module.exports = { loginService, getAllSellers };
