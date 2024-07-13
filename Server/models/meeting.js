const { required } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        link: {
            type: String,
            required: true
        },
        date:{
            type:Date,
            required:true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Meetings', meetingSchema, 'meetings');
