const Joi = require('joi')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const Class = require('../../models/class');
const Course = require('../../models/course');
const StudentDto = require('../../dto/Admin/StudentDto');
const TeacherDTO = require('../../dto/Admin/TeacherDTO')
const { CLOUD_NAME, API_KEY, API_SECRET } = require('../../config');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
})

async function handleUserRegister(req, res, next) {

    const { id, role, roll_No, Fname, Lname, email, password, DOB, phone, photo } = req.body;

    // 1 validate user input
    const userRegisterSchema = Joi.object({
        Fname: Joi.string().max(10).required(),
        Lname: Joi.string().max(10).required(),
        roll_No: Joi.string().max(15),
        id: Joi.string().max(10),
        role: Joi.string().max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(passwordPattern).required(),
        DOB: Joi.date().iso().required(),
        phone: Joi.string().max(15).required(),
        photo: Joi.string()

    })
    const { error } = userRegisterSchema.validate(req.body)
    // 2 if error in validation -> return error via middleware
    if (error) {
        return next(error)
    }
    // 3 if email is already registered or admin already exists->return an error 

    try {
        const emailInUse = await User.exists({ email })

        if (emailInUse) {
            const error = {
                status: 409,
                message: "Email already registered, use another email"
            }
            return next(error)
        }
        if (role === "Admin") {
            const error = {
                status: 409,
                message: "Admin Already Exists"
            }
            return next(error)
        }

    } catch (error) {
        return next(error)
    }
    // 4 password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // photo
    let response;
    try {
        response = await cloudinary.uploader.upload(photo, {
            folder: 'user_profile',
        });
    }
    catch (error) {
        return next(error)
    }

    // 5 user resgistration 

    let user;
    if (role === 'Student') {
        try {
            const userToRegister = new User({
                Fname,
                Lname,
                role,
                roll_No,
                email,
                password: hashedPassword,
                DOB,
                phone,
                photoPath: response.url
            })
            user = await userToRegister.save();

        } catch (error) {
            return next(error)
        }
    }
    else if (role === 'Teacher') {

        try {
            const userToRegister = new User({
                id,
                Fname,
                Lname,
                role,
                email,
                password: hashedPassword,
                DOB,
                phone,
                photoPath: response.url
            })
            user = await userToRegister.save();

        } catch (error) {
            return next(error)
        }
    }

    return res.status(201).json({ user, message: 'registered' })
}

async function HandleRemoveUser(req, res, next) {
    //validate id


    const removeUserchema = Joi.object({

        id: Joi.string().regex(mongoDbIdPattern).required()
    })
    const { error } = removeUserchema.validate(req.params)

    if (error) {
        return next(error)
    }

    const { id } = req.params

    // delete User

    const user = await User.findOne({ _id: id });

    console.log(user);

    if (user.role === "Student") {

        try {
            await Class.updateOne({ _id: user.class_id }, { $pull: { students: id } })

            await User.deleteOne({ _id: id })
        }
        catch (error) {
            return next(error);
        }
    }

    else if (user.role === "Teacher") {

        const courses = await Course.find({ teacher_id: id });

        try {
            await Promise.all(courses.map(course => Course.updateOne({ _id: course._id }, { teacher_id: null })));

            await User.deleteOne({ _id: id })
        }
        catch (error) {
            return next(error);
        }
    }

    return res.status(200).json({ message: 'User Deleted' })
}

async function handleGetStudents(req, res, next) {

    let students
    try {
        students = await User.find({ role: 'Student' }).populate('class_id');

    } catch (error) {
        return next(error)
    }
    const StudentsDto = students.map(student => new StudentDto(student));
    return res.status(200).json({ students: StudentsDto })
}

async function handleGetTeachers(req, res, next) {

    try {
        const teachers = await User.find({ role: 'Teacher' });
        const TeachersDto = teachers.map(teacher => new TeacherDTO(teacher));
        return res.status(200).json({ TeachersDto })
    }
    catch (error) {
        return next(error)
    }

}

async function handleUpdateStudent(req, res, next) {
    const { _id, role, roll_No, Fname, Lname, email, DOB, phone, photo } = req.body;

    // 1 validate user input
    const userRegisterSchema = Joi.object({
        _id: Joi.string().regex(mongoDbIdPattern).required(),
        Fname: Joi.string().max(10).required(),
        Lname: Joi.string().max(10).required(),
        roll_No: Joi.string().max(15),
        role: Joi.string().max(10).required(),
        email: Joi.string().email().required(),
        DOB: Joi.date().iso().required(),
        phone: Joi.string().max(15).required(),
        photo: Joi.string()

    })
    const { error } = userRegisterSchema.validate(req.body)
    // 2 if error in validation -> return error via middleware
    if (error) {
        return next(error)
    }

    

    // 5 user updation 
    let user;
    if (photo) {
        let response;

        try {
            response = await cloudinary.uploader.upload(photo, {
                folder: 'user_profile',
            });
        }
        catch (error) {
            return next(error)
        }
        try {
            user = await User.updateOne({ _id: _id }, {
                Fname,
                Lname,
                roll_No,
                role,
                email,
                DOB,
                phone,
                photoPath:response.url
            })
        }
        catch (error) {
            return next(error)
        }
    }
    else {
        try {
            user = await User.updateOne({ _id: _id }, {
                Fname,
                Lname,
                roll_No,
                role,
                email,
                DOB,
                phone
            })
        }
        catch (error) {
            return next(error)
        }
    }
    return res.status(201).json({ user, message: 'updated' })
}
async function handleUpdateTeacher(req, res, next) {
    const { _id, role, id, Fname, Lname, email, DOB, phone, photo } = req.body;

    // 1 validate user input
    const userRegisterSchema = Joi.object({
        _id: Joi.string().regex(mongoDbIdPattern).required(),
        Fname: Joi.string().max(10).required(),
        Lname: Joi.string().max(10).required(),
        id: Joi.string().max(10),
        role: Joi.string().max(10).required(),
        email: Joi.string().email().required(),
        DOB: Joi.date().iso().required(),
        phone: Joi.string().max(15).required(),
        photo: Joi.string()
    })
    const { error } = userRegisterSchema.validate(req.body)
    // 2 if error in validation -> return error via middleware
    if (error) {
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 5 user updation 
    let user;
    if (photo) {
        let response;

        try {
            response = await cloudinary.uploader.upload(photo, {
                folder: 'user_profile',
            });
        }
        catch (error) {
            return next(error)
        }
        try {
            user = await User.updateOne({ _id: _id }, {
                Fname,
                Lname,
                id,
                role,
                email,
                DOB,
                phone,
                photoPath:response.url
            })
        }
        catch (error) {
            return next(error)
        }
    }
    else {
        try {
            user = await User.updateOne({ _id: _id }, {
                Fname,
                Lname,
                id,
                role,
                email,
                DOB,
                phone
            })
        }
        catch (error) {
            return next(error)
        }
    }
    return res.status(201).json({ user, message: 'updated' })
}

module.exports = {
    handleUserRegister,
    handleGetStudents,
    handleGetTeachers,
    HandleRemoveUser,
    handleUpdateStudent,
    handleUpdateTeacher,
}