const { getByEmailAndPassword } = require('../services/UserService');

const login = async (req, res) => {
  console.log(req.body);

  const result = await getByEmailAndPassword(req.body);
  return res.status(200).json(result);
};

module.exports = { login };