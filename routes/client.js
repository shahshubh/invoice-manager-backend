const express = require('express');
const passport = require('passport');
const { createClient, findAllClients, findById, updateClient, deleteClient } = require('../controllers/client');

const clientRouter = express.Router();

clientRouter.get('/', passport.authenticate('jwt', { session: false }), findAllClients);
clientRouter.post('/', passport.authenticate('jwt', { session: false }), createClient);

clientRouter.get('/:id', passport.authenticate('jwt', { session: false }), findById)
clientRouter.put('/:id', passport.authenticate('jwt', { session: false }), updateClient)
clientRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteClient)


module.exports = clientRouter;