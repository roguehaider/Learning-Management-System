const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const meetingSchema = new Schema(
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
    link: {
        type: String,
        required: true
    },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Meetings', meetingSchema , 'meetings');
