const Meeting = require('../../models/meeting')
const Joi = require('joi')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;

async function handleGetMeeting(req, res, next) {

    const { teacher_id , date } = req.body;

    const getByIdSchema = Joi.object({
        teacher_id: Joi.string().regex(mongoDbIdPattern).required(),
        date: Joi.date().iso().required(),
    });
    const { error } = getByIdSchema.validate(req.body);
    if (error) {
        return next(error);
    }

    let link;

    try {
        link = await Meeting.findOne({ receiver: req.user._id, sender: teacher_id , date:date })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();
    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ link });
}


module.exports={
    handleGetMeeting
}