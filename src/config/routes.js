const express = require('express');
const { findAllInvoices, createInvoice, findById, deleteInvoice, updateInvoice } = require('../api/controllers/invoice.controller');

const router = express.Router();

//Invoices
router.get('/invoices', findAllInvoices);
router.post('/invoices', createInvoice);
router.get('/invoices/:id', findById);
router.put('/invoices/:id', updateInvoice);
router.delete('/invoices/:id', deleteInvoice);

module.exports = router;