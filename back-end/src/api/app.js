const express = require('express');
const cors = require('cors');
const registerRouter = require('../routes/register.routes');
const loginRouter = require('../routes/LoginRouter');
const productRouter = require('../routes/ProductRouter');
const salesRouter = require('../routes/SaleRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/register', registerRouter);
app.use('/sales', salesRouter);

module.exports = app;
