const express = require('express');
const { registerSale, getSales } = require('../controllers/SalesController');

const salesRouter = express.Router();

salesRouter.get('/', getSales);
salesRouter.post('/', registerSale);

module.exports = salesRouter;