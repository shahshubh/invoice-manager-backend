const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    createdBy: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

module.exports = mongoose.model('Client', ClientSchema);