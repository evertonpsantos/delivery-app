const md5 = require('md5');
const { User } = require('../database/models');

const loginService = async ({ email, password }) => {
  const { dataValues: userFound } = await User.findOne({
    where: { email },
  });
  
  if (!userFound) throw new Error('User not found');

  if (md5(password) !== userFound.password) {
    throw new Error('Wrong password');
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

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getSellerById,
  loginService,
  getAllSellers,
  getAllUsers,
  deleteUser,
};
