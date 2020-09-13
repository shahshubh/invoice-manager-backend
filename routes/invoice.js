const express = require('express');
const passport = require('passport');
const { findAllInvoices, createInvoice, findById, deleteInvoice, updateInvoice } = require('../controllers/invoice');

const invoiceRouter = express.Router();

invoiceRouter.get('/',passport.authenticate('jwt', { session: false }), findAllInvoices);
invoiceRouter.post('/', passport.authenticate('jwt', { session: false }), createInvoice);

invoiceRouter.get('/:id', passport.authenticate('jwt', { session: false }), findById);
invoiceRouter.put('/:id', passport.authenticate('jwt', { session: false }), updateInvoice);
invoiceRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteInvoice);

module.exports = invoiceRouter;