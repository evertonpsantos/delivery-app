const express = require('express');
const { login } = require('../controllers/UserController');

const loginRouter = express.Router();

loginRouter.post('/', login);

module.exports = loginRouter;