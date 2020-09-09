const express = require('express');
const { findAllInvoices, createInvoice, findById, deleteInvoice, updateInvoice } = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.get('/', findAllInvoices);
invoiceRouter.post('/', createInvoice);

invoiceRouter.get('/:id', findById);
invoiceRouter.put('/:id', updateInvoice);
invoiceRouter.delete('/:id', deleteInvoice);

module.exports = invoiceRouter;