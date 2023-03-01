const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const config = {
  algorithm: 'HS256',
  noTimestamp: true,
};

const secretPath = path.resolve(__dirname, '..', '..', 'jwt.evaluation.key');

const newToken = async ({ name, email, role }) => {
  const secret = (await fs.readFile(secretPath, 'utf-8')).trim();
  console.log(secret);
  return jwt.sign({ name, email, role }, secret, config);
};

const verifyToken = async (token) => {
  const secret = await fs.readFile(secretPath, 'utf-8');
  return jwt.verify(token, secret);
};

module.exports = {
  newToken,
  verifyToken,
};
