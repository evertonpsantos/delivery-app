const registerService = require('../services/registerService');

async function registerUser(req, res) {
  const { body } = req;

  try {
    const result = await registerService.registerUser({ ...body });

    if (result.message) throw new Error(result.message);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

async function registerNewUserAdmin(req, res) {
  try {
    const result = await registerService.registerUserAdmin(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  registerNewUserAdmin,
};
