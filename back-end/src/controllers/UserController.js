const { loginService, getAllSellers } = require('../services/UserService');
const { newToken } = require('../utils/jwtFunction');

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    const token = await newToken(result);
    const { id, name, email, role } = result;
    return res.status(200).json({ id, name, email, role, token });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const getSellers = async (_req, res) => {
  const result = await getAllSellers();
  return res.status(200).json(result);
}

module.exports = { login, getSellers };
