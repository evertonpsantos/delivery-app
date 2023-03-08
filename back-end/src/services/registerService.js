const md5 = require('md5');
const { User } = require('../database/models/index');
const { newToken } = require('../utils/jwtFunction');

async function registerUser(dataNewUser) {
    const { name, email, password } = dataNewUser;
    
    const md = md5(password, 10);

    try {
      const findUserName = await User.findOne({ where: { name } });
      if (findUserName) throw new Error('This name is already registered');

      const findUserEmail = await User.findOne({ where: { email } });
      if (findUserEmail) throw new Error('This email is already registered');

      const createUser = await User.create({ name, email, password: md, role: 'customer' });
      if (!createUser) throw new Error('Not possible to register this user');

      const dadosToken = { id: createUser.id, name, email, role: 'customer' };
      const token = newToken(dadosToken);
      const userNewToken = { id: createUser.id, name, email, role: 'customer', token };

      return userNewToken;
    } catch (error) {
      return { message: error.message };
    }
}

async function registerUserAdmin({ name, email, password, role }) {
  const mdPassword = md5(password, 10);

  const userExists = await User.findOne({ where: { name, email } });
  if (userExists) throw new Error('Email or name already exists');

  const newUser = await User.create({ name, email, password: mdPassword, role });
  return newUser;
}

module.exports = {
  registerUser,
  registerUserAdmin,
};
