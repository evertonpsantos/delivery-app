const express = require('express');
const { login, getSellers } = require('../controllers/UserController');

const loginRouter = express.Router();

loginRouter.post('/', login);
loginRouter.get('/sellers', getSellers);

module.exports = loginRouter;