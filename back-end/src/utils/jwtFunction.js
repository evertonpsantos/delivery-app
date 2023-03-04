const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const config = {
  algorithm: 'HS256',
  noTimestamp: true,
};

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

const newToken = ({ id, name, email, role }) => {
  const tokenCreate = jwt.sign({ id, name, email, role }, secret, config);
  return tokenCreate;
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  newToken,
  verifyToken,
};
