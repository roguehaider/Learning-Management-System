const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Attendance = require('../../models/attendence')
const User = require('../../models/user')
const AttendanceDTO = require('../../dto/Teacher/attendenceDTO')
const StudentDTO = require('../../dto/Teacher/studentDTO')



async function getStudentsOfClass(req , res , next){
    
    const class_id = req.user.class_id;

    let students

    let StudentDto = [];

    try{
        students = await User.find({class_id:class_id , role:"Student"})
        for (const student of students) {
            const studentDto = new StudentDTO(student);
            StudentDto.push(studentDto);
        }
    }
    catch(error){
        return next(error)
    }
    
    return res.status(200).json({students:StudentDto})

}

async function handleCreateAttendence(req , res , next){

    const {date , attendanceList } = req.body;

    const schema = Joi.object({
        date: Joi.date().iso().required(),
        attendanceList: Joi.array().items(Joi.object({
            student: Joi.string().regex(mongoDbIdPattern).required(),
            status: Joi.string().valid('Present', 'Absent').required()
        })).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    let newAttendence ;
    
    const class_id = req.user.class_id

    try {
        
        newAttendence = new Attendance({
            class_id,
            date,
            attendanceList
        })
        newAttendence.save();
    return res.status(201).json({message:'Attendence Posted'})
    }
    catch (error) {
        return next(error);
    }
} 

async function getAttendenceByClass(req ,res , next){

    const class_id = req.user.class_id

    let attendences;

    let AttendenceDTO = [];

    try {
        attendences = await Attendance.find({class_id:class_id}).populate({
            path: 'attendanceList.student',
            model: 'User' 
        });

        for(i=0 ; i<attendences.length ; i++){
        const attendenceDTO = new AttendanceDTO(attendences[i])
        AttendenceDTO.push(attendenceDTO)
        }
    } catch (error) {
        return next(error)
    }

    return res.status(200).json({attendence:AttendenceDTO})
}


async function getAttendenceByDate(req , res , next){

    const schema = Joi.object({
        date: Joi.date().iso().required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return next(error);
    }

    const {date} = req.params 

    let attendences;

    let AttendenceDTO = [];

    try {
        attendences = await Attendance.find({class_id:req.user.class_id, date:date}).populate({
            path: 'attendanceList.student',
            model: 'User' 
        });
        for(i=0 ; i<attendences.length ; i++){
        const attendenceDTO = new AttendanceDTO(attendences[i])
        AttendenceDTO.push(attendenceDTO)
        }
    }
    catch (error) {
        return next(error)
    }

    return res.status(200).json({attendence:AttendenceDTO})    
    
}
module.exports={
    handleCreateAttendence,
    getAttendenceByClass,
    getAttendenceByDate,
    getStudentsOfClass
}