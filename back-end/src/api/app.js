const express = require('express');
const cors = require('cors');
const path = require('path');
const registerRouter = require('../routes/registerRouter');
const loginRouter = require('../routes/LoginRouter');
const productRouter = require('../routes/ProductRouter');
const salesRouter = require('../routes/SaleRouter');
const salesProductsRouter = require('../routes/salesProductsRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.resolve(__dirname, '../../images')));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/register', registerRouter);
app.use('/sales', salesRouter);
app.use('/salesproducts', salesProductsRouter);

module.exports = app;
