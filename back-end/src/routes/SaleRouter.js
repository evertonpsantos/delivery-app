const express = require('express');
const salesController = require('../controllers/SalesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSales);
salesRouter.post('/', salesController.registerSale);
salesRouter.get('/user/:id', salesController.findAll);
salesRouter.get('/seller/:id', salesController.findSaleBySeller);
salesRouter.patch('/:id', salesController.updateSaleStatus);

module.exports = salesRouter;
