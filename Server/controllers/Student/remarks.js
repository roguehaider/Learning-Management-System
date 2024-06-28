const Remarks = require('../../models/remarks')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Course = require('../../models/course')

async function handleStudentPostRemarks(req , res , next){

    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        reciever: Joi.string().regex(mongoDbIdPattern).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    const {title , description , reciever} = req.body
    const sender = req.user._id;

    let newRemarks;
    try {
        newRemarks = new Remarks({
            title,
            description,
            sender,
            reciever
        });
        await newRemarks.save();
    }
    catch (error) {
        return next(error);
    }
    res.status(201).json({ message: 'remarks posted', remarks: newRemarks });
}

async function handleGetRemarksByCourse(req , res , next){

    const schema = Joi.object({
        course_id: Joi.string().regex(mongoDbIdPattern).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    const {course_id} = req.params
    let teacher_id;

    try {
        const course = await Course.findById({_id:course_id})
        teacher_id = course.teacher_id;
    }
    catch (error) {
        next(error)
    }


    let allRemarks;
    let user = req.user._id;
    try {
    allRemarks = await Remarks.find({reciever:user , sender:teacher_id})
    }
    catch (error) {
        return next(error)
    }
        
    return res.status(200).json({remarks:allRemarks})
}

module.exports={
    handleStudentPostRemarks,
    handleGetRemarksByCourse
}