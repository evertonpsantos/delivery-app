const express = require('express');
const loginRouter = require('../routes/LoginRouter');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);

module.exports = app;
