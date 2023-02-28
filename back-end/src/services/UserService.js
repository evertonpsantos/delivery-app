const { User } = require('../database/models');

const getByEmailAndPassword = async ({ email }) => {
  const userFound = await User.findOne({
    where: { email },
  });

  if(!userFound) throw new Error('User not found');

  return userFound;
};

module.exports = { getByEmailAndPassword };