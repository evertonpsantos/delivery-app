const { User } = require('../database/models');

const getByEmailAndPassword = async ({ email }) => {
  console.log(email);
  const userFound = await User.findAll({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  return userFound;
};

module.exports = { getByEmailAndPassword };