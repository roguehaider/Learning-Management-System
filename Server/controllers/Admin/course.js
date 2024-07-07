const Course = require('../../models/course')
const Class = require('../../models/class');
const courseDTO= require('../../dto/Admin/courseDTO')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;

async function handleCreateCourse(req, res, next) {
    const { name, description , teacher_id} = req.body;

    // Validate request body
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        teacher_id:Joi.string().regex(mongoDbIdPattern).required(),

    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }
    let newCourse;
    try {

        newCourse = new Course({
            name,
            description,
            teacher_id
        });

        await newCourse.save();

    } catch (error) {
        return next(error);
    }
    res.status(201).json({ message: 'Course added', course: newCourse });
}

async function handleUpdateCourse(req, res, next) {
    const { name, description , teacher_id , class_id} = req.body;

    // Validate request body
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        teacher_id:Joi.string().regex(mongoDbIdPattern).required(),
        class_id:Joi.string().regex(mongoDbIdPattern).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }
    
    const {id} = req.params;

    try{
        await Course.updateOne({_id:id},{
            name,
            description,
            teacher_id,
            class_id
        })
    }
    catch (error) {
        return next(error);
    }
    res.status(200).json({ message: 'Course updated'});
}

async function handleDeleteCourse(req, res, next) {

    //validate id
    const Schema = Joi.object({
        course_id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = Schema.validate(req.params)
    
    if (error) {
        return next(error)
    }
    
    const { course_id } = req.params

    try {
        const course = await Course.findOne({_id:course_id})
        if(course.class_id!=null){
           const  clas_id = await Class.findOne({_id:course.class_id})
           await Class.updateOne({_id:clas_id}, { $pull: { courses:course_id } })
        }
        
        await Course.deleteOne({_id:course_id})
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ message:'Course deleted' }) 
}

async function getAllCourses(req , res , next){

    let allCourses;
    let courseDto= [];
    try {
        allCourses = await Course.find({});
        for (let i = 0; i < allCourses.length; i++) {
            const dto = new courseDTO(allCourses[i])
            courseDto.push(dto);
        }
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ courses: courseDto })
}

async function handleGetCourseById(req, res, next) {

    // validate id 
    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }

    let detailCourse;

    const { id } = req.params
    try {
        detailCourse = await Course.findOne({ _id: id })
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ course: detailCourse })
}

module.exports = {
    handleCreateCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    getAllCourses,
    handleGetCourseById
};