const express = require('express');
const product = require('../controllers/ProductController');

const productRouter = express.Router();

productRouter.get('/', product.findAllProducts);

module.exports = productRouter;
