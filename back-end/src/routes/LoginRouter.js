const express = require('express');
const { login, getSellers, getUsers } = require('../controllers/UserController');

const loginRouter = express.Router();

loginRouter.post('/', login);
loginRouter.get('/sellers', getSellers);
loginRouter.get('/users', getUsers);

module.exports = loginRouter;