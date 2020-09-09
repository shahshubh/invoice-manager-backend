const express = require('express');
const invoiceRouter = require('./invoice');
const clientRouter = require('./client');

const rootRouter = express.Router();

rootRouter.use('/invoices', invoiceRouter);
rootRouter.use('/clients', clientRouter);


module.exports = rootRouter;