const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Message = require('../../models/message')
const Chat = require('../../models/chat')

async function handleSendMessage(req, res, next) {

    const sender_id = req.user._id

    const { chat_id, content, receiver_id } = req.body

    const getByIdSchema = Joi.object({
        chat_id: Joi.string().regex(mongoDbIdPattern),
        receiver_id: Joi.string().regex(mongoDbIdPattern),
        content: Joi.string()

    })
    const { error } = getByIdSchema.validate(req.body);
    if (error) {
        return next(error)
    }


    if (chat_id) {
        try {
            const newMessage = new Message({
                sender_id,
                content,
                chat_id
            });
            await newMessage.save();

            await Chat.updateOne({ _id: chat_id }, {
                latest_message_id: newMessage._id
            })

            return res.status(200).json({ message: 'message sent' })
        }
        catch (error) {
            return next(error)
        }
    }
    else {

        try {
            const newMessage = new Message({
                sender_id,
                content,
            });
            await newMessage.save();


            const newChat = new Chat({
                users: [req.user._id, receiver_id],
                latest_message_id: newMessage._id,
            });
            await newChat.save();


            await Message.updateOne({_id:newMessage._id},{
                chat_id:newChat._id
            })

            return res.status(200).json({ message: 'message sent' })
        }
        catch (error) {
            return next(error)
        }

    }

}

module.exports = {
    handleSendMessage
}