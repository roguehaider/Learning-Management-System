const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  latest_message_id: { type: Schema.Types.ObjectId, ref: 'Message' },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema, 'chats');


