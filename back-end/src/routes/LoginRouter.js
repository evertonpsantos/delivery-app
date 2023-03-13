const express = require('express');
const { login, getSellers, getUsers, removeUser } = require('../controllers/UserController');

const loginRouter = express.Router();

loginRouter.post('/', login);
loginRouter.delete('/remove/:id', removeUser);
loginRouter.get('/sellers', getSellers);
loginRouter.get('/users', getUsers);

module.exports = loginRouter;