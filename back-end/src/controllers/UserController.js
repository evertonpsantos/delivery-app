const { getByEmailAndPassword } = require('../services/UserService');

const getUserByEmailAndPassword = async (req, res) => {
  console.log(req.body);
  const result = await getByEmailAndPassword(req.body);
  if (!result) return res.status(404);
  return res.status(200).json(result);
}

module.exports = { getUserByEmailAndPassword };