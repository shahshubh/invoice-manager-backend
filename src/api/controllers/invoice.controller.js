// const Joi = require('joi');
const httpStatus = require('http-status-codes');
const Invoice = require("../models/invoice");

exports.findAllInvoices = (req,res) => {
    const { page=1, perPage=10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(perPage)
    };

    Invoice.paginate({}, options)
    .then(data => res.json(data))
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err));
};


exports.createInvoice = (req,res) => {
    const { item, qty, date, due, tax, rate } = req.body;
    // const schema = Joi.object().keys({
    //     item: Joi.string().required(),
    //     date: Joi.date().required(),
    //     due: Joi.date().required(),
    //     qty: Joi.number().integer().required(),
    //     tax: Joi.number().optional(),
    //     rate: Joi.number().optional()
    // });


    if(!item || !date || !due || !qty){
        return res.status(httpStatus.BAD_REQUEST).json({
            err: 'Please fill all the required field'
        });
    }
    Invoice.create({ item, qty, date, due, tax, rate })
    .then((data) => res.json(data))
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err));
};

exports.findById = (req,res) => {
    const {id} = req.params;
    Invoice.findById(id)
    .then(invoice => {
        if(!invoice){
            return res.status(httpStatus.NOT_FOUND).json({ err: 'Invoice not found' });
        }
        return res.json(invoice);
    })
    .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err: 'Invoice not found' })
    });
};

exports.updateInvoice = (req,res) => {
    const { item, qty, date, due, tax, rate } = req.body;
    const {id} = req.params;

    if((item === "") || ( date === "") || ( due === "") || (qty === "") ){
        return res.status(httpStatus.BAD_REQUEST).json({
            err: 'Please fill all the required field'
        });
    }

    Invoice.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(data => res.json(data))
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err));

};

exports.deleteInvoice = (req,res) => {
    const {id} = req.params;
    Invoice.findByIdAndRemove(id)
    .then(invoice => {
        if(!invoice){
            return res.status(httpStatus.NOT_FOUND).json({ err: 'Invoice not found' });
        }
        return res.json(invoice);
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err));
};