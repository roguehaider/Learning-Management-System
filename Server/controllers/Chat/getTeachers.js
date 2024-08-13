const Course = require('../../models/course')

async function getTeachersIds(req, res , next) {

    const user = req.user

    try {
        const courses = await Course.find({class_id:user.class_id}).populate('teacher_id', 'Fname Lname')

        const courseTeacherData = courses.map(course => ({
            courseName: course.name,
            teacherId: course.teacher_id._id,
            teacherFname: course.teacher_id.Fname,
            teacherLname: course.teacher_id.Lname
        }));
    
        return res.status(200).json({courseTeacherData})
    } catch (error) {
        return next(error)
    }
}

module.exports={
    getTeachersIds
}