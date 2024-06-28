const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Assessments = require('../../models/assesment');
const Course = require('../../models/course');
const AssesmentDTO = require('../../dto/Teacher/assesmentDTO')

async function handleCreateAssessment(req , res , next){

    const {type , course_id , TotalMarks} = req.body;

    const schema = Joi.object({

        type:Joi.string().required(),
        course_id:Joi.string().regex(mongoDbIdPattern).required(),
        TotalMarks:Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    let course;
    try {
        course = await Course.findById({_id:course_id})
    }
    catch (error) {
        next(error)
    }

    let class_id = course.class_id;

    let newAssessment;

    try {
        
        newAssessment = new Assessments({
            type,
            course_id,
            class_id,
            TotalMarks,
        });

        await newAssessment.save();

    } catch (error) {
        return next(error);
    }
    res.status(201).json({ message: 'Assesment Created', assesment: newAssessment });
}

async function handleAddAssesmentMarks(req , res , next){
    const {assesment_id , MarksList} = req.body
   
    const schema = Joi.object({
        assesment_id:Joi.string().regex(mongoDbIdPattern).required(),
        MarksList: Joi.array().items(Joi.object({
            student: Joi.string().regex(mongoDbIdPattern).required(),
            obtained_marks:Joi.number().required(),
        })).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        await Assessments.updateOne(  
            {_id:assesment_id},
            { $set: { MarksList: MarksList } }
        )
    }
    catch (error) {
        return next(error)
    }
    return res.status(201).json({message:"Marks added"})
}

async function getAssesmentsByCourse(req , res , next){

    const {id} = req.params

    const schema = Joi.object({
        
        id:Joi.string().regex(mongoDbIdPattern).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    let assesments ;
    let AssesmentsDTO =[];

    try {
        assesments = await Assessments.find({course_id:id}).populate({
            path: 'MarksList.student',
            model: 'User' 
        })
        .populate({
            path: 'course_id',
            model: 'Course', 
        });
        for(i=0 ; i<assesments.length ; i++){
            const assesmentDTO = new AssesmentDTO(assesments[i])
            AssesmentsDTO.push(assesmentDTO)
            }
    }
    catch (error) {
        next(error)
    }

    return res.status(200).json({AssesmentsDTO})
}

async function updateMarksByStudent(req , res , next){

    const {assesment_id , student_id , obtained_marks} = req.body

    const schema = Joi.object({
        assesment_id:Joi.string().regex(mongoDbIdPattern).required(),
        student_id: Joi.string().regex(mongoDbIdPattern).required(),
        obtained_marks:Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        await Assessments.findOneAndUpdate(
            { _id: assesment_id, 'MarksList.student': student_id },
            { $set: { 'MarksList.$.obtained_marks': obtained_marks } },
            { new: true }
        );
    }
    catch (error) {
        next(error)
    }

    return res.status(200).json({message:"Marks Updated"})
}

module.exports={
    handleCreateAssessment,
    handleAddAssesmentMarks,
    getAssesmentsByCourse,
    updateMarksByStudent
}