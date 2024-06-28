const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const remarksSchema = new Schema(
    {
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    },
    { timestamps: true }
);

module.exports = mongoose.model('Remarks', remarksSchema , 'remarks');
