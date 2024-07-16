const Course = require('../../models/course')
const courseDTO = require('../../dto/Admin/courseDTO')
const CourseDTO = require('../../dto/Teacher/courseDTO')
const courseStudentDTO = require('../../dto/Teacher/courseStudentDTO')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;

async function handleGetCourse(req , res , next){

    const id = req.user._id;

    let allCourses;
    let courseDto = [];
    try {
        allCourses = await Course.find({teacher_id:id});
    } catch (error) {
        return next(error)
    }
    for (let i = 0; i < allCourses.length; i++) {
        const dto = new courseDTO(allCourses[i])
        courseDto.push(dto);
    }

    return res.status(200).json({ course: courseDto })
}

async function GetCourseById(req , res , next){

    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }
      const { id } = req.params

      let detailCourse;

    try {
        detailCourse = await Course.findOne({ _id:id }).populate({
            path: 'class_id',
                populate: {
                    path: 'students'
                }
                });
    }
    catch (error) {
        return next(error)
    }

    const courseDto = new CourseDTO(detailCourse)

    return res.status(200).json({ course: courseDto })
}


async function handleGetStudentsOfCourse(req , res , next){

    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }
      const { id } = req.params

      let detailCourse;

    try {
        detailCourse = await Course.findOne({ _id:id }).populate({
            path: 'class_id',
                populate: {
                    path: 'students'
                }
                });
    }
    catch (error) {
        return next(error)
    }

    const courseStudents = new courseStudentDTO(detailCourse)

    return res.status(200).json({courseStudents })
}

module.exports={
    handleGetCourse,
    GetCourseById,
    handleGetStudentsOfCourse
}