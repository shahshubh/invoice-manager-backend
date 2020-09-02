const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const InvoiceSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,

    },
    due: {
        type: Date,
        required: true,
    },
    rate: {
        type: Number,
    },
    tax: {
        type: Number,
    }
});

InvoiceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Invoice', InvoiceSchema);