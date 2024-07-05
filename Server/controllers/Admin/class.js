const Class = require('../../models/class');
const User = require('../../models/user');
const Course = require('../../models/course')
const classDTO = require('../../dto/Admin/classDto')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;

async function handleCreateClass(req, res, next) {
    const { name } = req.body;
    const totalStudents = 0;

    // Validate request body
    const schema = Joi.object({
        name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }
    let newClass;
    try {
        // Create a new class
        newClass = new Class({
            name,
            totalStudents
        });

        // Save the new class to the database
        await newClass.save();

    } catch (error) {
        return next(error);
    }
    res.status(201).json({ message: 'Class registered', class: newClass });
}

async function handleAddClassTeacher(req , res , next){

    const {class_id ,teacher_id } = req.body;

    const schema = Joi.object({
        class_id: Joi.string().regex(mongoDbIdPattern).required(),
        teacher_id: Joi.string().regex(mongoDbIdPattern).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        await Class.updateOne(  
            {_id:class_id},
            { $set: { teacher_id: teacher_id } }
        )
        await User.updateOne(
            { _id: teacher_id },
            { $set: { class_id: class_id } }
        )
    }
    catch (error) {
        return next(error)
    }
    try {
        await User.updateOne({_id:teacher_id},{
            IsClassTeacher:true
        })
    }
    catch (error) {
        return next(error)
    }

    return res.status(201).json({message:"Teacher added"})

}

async function handleAddStudents(req, res, next) {
    const { class_id, students } = req.body;

    // Validate request body
    const schema = Joi.object({
        class_id: Joi.string().regex(mongoDbIdPattern).required(),
        students: Joi.array().items(Joi.string().regex(mongoDbIdPattern)).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {

        await Class.updateOne(
            { _id: class_id },
            {   $push: { students: { $each: students } },
                $inc: { totalStudents: students.length }
            }// Use $push to add students to the existing array
        );

        await Promise.all(students.map(async (student_id) => {
            await User.updateOne(
                { _id: student_id },
                { $set: { class_id: class_id } }
            );
        }));
    } catch (error) {
        return next(error)
    }

    const updatedClass = await Class.findOne({ _id: class_id });

    res.status(201).json({ message: 'Added successfully', class: updatedClass });
}

async function handleRemoveStudent(req , res , next){

    const schema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    const {id} = req.params;

    let student;

    try{
        student = await User.findOne({_id:id});

        await Class.updateOne({_id:student.class_id}, { $pull: { students:id } })

        const classToUpdate = await Class.findOne({ _id: student.class_id });

        await User.updateOne({_id:student._id} , {class_id:null})

        // Decrement the totalStudents count
        classToUpdate.totalStudents -= 1;

        // Update the class document
        await classToUpdate.save();
    } 
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ message:'Student Removed'}) 

}

async function handleAddCourse(req, res, next) {
    const { class_id, courses } = req.body;

    // Validate request body
    const schema = Joi.object({
        class_id: Joi.string().regex(mongoDbIdPattern).required(),
        courses: Joi.array().items(Joi.string().regex(mongoDbIdPattern)).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {

        await Class.updateOne(
            { _id: class_id },
            { $push: { courses: { $each: courses } } } // Use $push to add students to the existing array
        );

        await Promise.all(courses.map(async (course_id) => {
            await Course.updateOne(
                { _id: course_id },
                { $set: { class_id: class_id } }
            );
        }));
    } catch (error) {
        return next(error)
    }
    const updatedClass = await Class.findOne({ _id: class_id });

    res.status(201).json({ message: 'Course added', class: updatedClass });
}

async function handleRemoveCourse(req , res , next){
    
    const schema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required(),    
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    const {id} = req.params;

    let course;
    
    try{
        course = await Course.findOne({_id:id});

        await Class.updateOne({_id:course.class_id}, { $pull: { courses:id } })

        await Course.updateOne({_id:id},{class_id:null}) 
    }
    catch(error){
        return next(error);
    } 

    return res.status(200).json({ message:'Course removed' }) 

}

async function handleGetClasses(req, res, next) {

    let allClasses;
    const classDto = [];
    try {
        allClasses = await Class.find({});
        for (let i = 0; i < allClasses.length; i++) {
            const dto = new classDTO(allClasses[i])
            classDto.push(dto);
        }
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ classes: classDto })
}

async function handleGetClassById(req, res, next) {

    // validate id 
    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }

    let detailClass;

    const { id } = req.params
    try {
        detailClass = await Class.findOne({ _id: id })
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({ class: detailClass })
}

async function handleDeleteClass(req, res, next) {
    //validate id


    const Schema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = Schema.validate(req.params)

    if (error) {
        return next(error)
    }

    const { id } = req.params

    // delete class

    try {
        const usersToUpdate = await User.find({ class_id: id });

        await Promise.all(usersToUpdate.map(async (user) => {

            // const updatedClass_id="";
            // await User.updateOne({class_id},{class_id:updatedClass_id})

            user.class_id = null; // Set class_id to ""
            await user.save(); // Save the updated user
        }));
        await Class.deleteOne({ _id: id })
    } catch (error) {
        return next(error)
    }
    return res.status(200).json({ messge:'Class deleted' })
}

module.exports = {
    handleCreateClass,
    handleDeleteClass,
    handleGetClasses,
    handleGetClassById,
    handleAddClassTeacher,
    handleAddStudents,
    handleRemoveStudent,
    handleAddCourse,
    handleRemoveCourse
};