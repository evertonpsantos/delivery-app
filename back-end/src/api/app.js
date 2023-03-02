const express = require('express');
const cors = require('cors');
const registerRouter = require('../routes/registerRouter');
const loginRouter = require('../routes/LoginRouter');
const salesRouter = require('../routes/salesRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/sales', salesRouter);

module.exports = app;
