const { Router } = require('express');
const salesProductsController = require('../controllers/salesProductsController');

const salesProductsRouter = Router();

salesProductsRouter.get('/:id', salesProductsController.findSaleAndProduct);

module.exports = salesProductsRouter;
