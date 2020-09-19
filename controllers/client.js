const httpStatus = require('http-status-codes');
const Client = require('../models/client');


exports.findAllClients = async (req,res) => {
    try {
        const allClients = await Client.find({ createdBy: req.currentUser._id });
        return res.json(allClients);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.createClient = async (req,res) => {
    try {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const { firstName, lastName, email } = req.body;

        if(!firstName || !lastName || !email){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please fill all the required field'
            });
        }
        if(!emailRegex.test(email)){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please enter valid email address.'
            });
        }

        let data = req.body;
        data.createdBy = req.currentUser._id;
        
        const newClient = await Client.create(data);
        return res.json(newClient);

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
};


exports.findById = async (req,res) => {
    try {
        const client = await Client.findById(req.params.id);
        if(!client){
            return res.status(httpStatus.NOT_FOUND).json({ err: 'Client not found' });
        }
        return res.json(client);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.updateClient = async (req, res) => {
    try {

        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const { firstName, lastName, email } = req.body;

        if(firstName == "" || lastName == "" || email == ""){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please fill all the required field'
            });
        }
        if(!emailRegex.test(email)){
            return res.status(httpStatus.BAD_REQUEST).json({
                err: 'Please enter valid email address.'
            });
        }

        const client = await Client.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
        return res.json(client);
        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findOneAndRemove({_id: req.params.id});
        if(!client){
            return res.status(httpStatus.NOT_FOUND).json({ err: 'Could not delete client' });
        }
        return res.json(client);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
}

