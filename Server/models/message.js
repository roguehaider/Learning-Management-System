const mongoose = require('mongoose')
const { Schema } = require('mongoose');


const messageSchema = new Schema({
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    chat_id: { type: Schema.Types.ObjectId, ref: 'Chat' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema, 'messages');

