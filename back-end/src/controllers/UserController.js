const { loginService } = require('../services/UserService');

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { login };