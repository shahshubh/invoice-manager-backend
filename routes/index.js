const express = require('express');
const invoiceRouter = require('./invoice');
const clientRouter = require('./client');
const userRouter = require('./user');

const rootRouter = express.Router();

rootRouter.use('/invoices', invoiceRouter);
rootRouter.use('/clients', clientRouter);
rootRouter.use('/users', userRouter);


module.exports = rootRouter;