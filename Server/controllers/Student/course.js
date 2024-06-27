const Course = require('../../models/course')
const User = require('../../models/user');
const courseDTO = require('../../dto/Admin/courseDTO')
const CourseDTO = require('../../dto/Student/courseDTO')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;

async function handleGetStudentCourses(req , res , next){

    const id = req.user._id;

    let user;
    let class_id;

    try {
        user = await User.findById({_id:id});
        class_id = user.class_id;
    }
    catch (error) {
        next(error)
    }

    let allCourses;
    let courseDto = [];
    try {
        allCourses = await Course.find({class_id:class_id});
    } catch (error) {
        return next(error)
    }
    for (let i = 0; i < allCourses.length; i++) {
        const dto = new courseDTO(allCourses[i])
        courseDto.push(dto);
    }

    return res.status(200).json({ course: courseDto })
}

async function handleGetStudentCourseById(req , res , next){

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
        detailCourse = await Course.findOne({ _id:id }).populate('teacher_id');
    }
    catch (error) {
        return next(error)
    }

    const courseDto = new CourseDTO(detailCourse)

    return res.status(200).json({ course: courseDto })
}

module.exports={
    handleGetStudentCourses,
    handleGetStudentCourseById
}