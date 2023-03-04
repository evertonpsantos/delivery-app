const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/user/:id', salesController.findAll);

module.exports = salesRouter;
