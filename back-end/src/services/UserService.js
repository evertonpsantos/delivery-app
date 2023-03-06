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

module.exports = { loginService };