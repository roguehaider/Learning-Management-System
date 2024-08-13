const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Chat = require('../../models/chat')
const Message = require('../../models/message')

async function handleGetChats(req, res, next) {

    let chats

    let user = req.user._id

    try {
        chats = await Chat.find({ users: { $in: [user] } }).populate('users', 'Fname Lname')

        return res.status(200).json({ chats })
    }
    catch (error) {
        return next(error)
    }
}

async function getChatById(req, res, next) {

    const { chat_id } = req.params

    const getByIdSchema = Joi.object({
        chat_id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }

    try {
        const messages = await Message.find({ chat_id: chat_id }).populate('sender_id', 'Fname Lname')

        return res.status(200).json({ messages })
    } catch (error) {
        return next(error)
    }

}

module.exports = {
    handleGetChats,
    getChatById
}