const express = require('express');
const { getUserByEmailAndPassword } = require('../controllers/UserController');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => getUserByEmailAndPassword(req, res));

module.exports = loginRouter;