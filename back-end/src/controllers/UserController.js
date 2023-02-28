const { getByEmailAndPassword } = require('../services/UserService');

const login = async (req, res) => {
  console.log(req.body);
  try {
    const result = await getByEmailAndPassword(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { login };