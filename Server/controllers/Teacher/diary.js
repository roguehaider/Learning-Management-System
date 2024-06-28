const Diary = require('../../models/diary');
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Course = require('../../models/course')
const diaryDTO = require('../../dto/Teacher/diaryDTO')

async function handlePostDiary(req, res, next) {

    const { course_id, description, date } = req.body;

    const schema = Joi.object({
        date: Joi.date().iso().required(),
        course_id: Joi.string().regex(mongoDbIdPattern).required(),
        description: Joi.string().required()

    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    let course_class_id;
    try {
        const course = await Course.findById({ _id: course_id })
        course_class_id = course.class_id;
    }
    catch (error) {
        return next(error)
    }

    let newDairy;

    try {
        newDairy = new Diary({
            date,
            course_id,
            description,
            course_class_id
        })

        await newDairy.save();
    }
    catch (error) {
        return next(error)
    }

    return res.status(201).json({ message: "posted", diary: newDairy })
}

async function handleUpdateDiary(req, res, next) {

    const { diary_id, description } = req.body;

    const schema = Joi.object({
        diary_id: Joi.string().regex(mongoDbIdPattern).required(),
        description: Joi.string().required()

    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        await Diary.updateOne({ _id: diary_id }, {
            description
        })
    }
    catch(error) {
       return  next(error)
    }
    return res.status(200).json({ message: "Updated succesfully" })
}


async function handleGetAllDiaries(req , res , next){

    const teacher_id = req.user._id;

    let courseIds;

    try {

        // Find courses taught by the teacher
        const courses = await Course.find({ teacher_id: teacher_id });
         courseIds = courses.map(course => course._id);
    }
    catch(error){
       return next(error)
    } 

    let diaries;
    let diaryDto = []

    try{   

        // Find diaries for the specific date and courses taught by the teacher
        diaries = await Diary.find({
            course_id: { $in: courseIds },
            date: Date.now()
        }).populate('course_id');

    }
    catch (error){
        return next(error);
    }

    for(const d of diaries){
        const diary = new diaryDTO(d)
        diaryDto.push(diary);
    }
    
    return res.status(200).json({ diaries:diaryDto });
}


module.exports = {
    handlePostDiary,
    handleUpdateDiary,
    handleGetAllDiaries
}