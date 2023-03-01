const registerService = require('../services/registerService');

async function registerUser(req, res) {
  const { body } = req;

  try {
    const result = await registerService.registerUser({ ...body });

    if (result.message) throw new Error(result.message);

    return res.status(201).json({ message: 'Created sucessfully' });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
};
