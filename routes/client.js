const express = require('express');
const { createClient, findAllClients, findById, updateClient, deleteClient } = require('../controllers/client');

const clientRouter = express.Router();

clientRouter.get('/', findAllClients);
clientRouter.post('/', createClient);

clientRouter.get('/:id', findById)
clientRouter.put('/:id', updateClient)
clientRouter.delete('/:id', deleteClient)


module.exports = clientRouter;