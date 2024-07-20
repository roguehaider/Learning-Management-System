const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Attendance = require('../../models/attendence')
const Leave = require('../../models/leave')
const User = require('../../models/user')
const AttendanceDTO = require('../../dto/Teacher/attendenceDTO')
const StudentDTO = require('../../dto/Teacher/studentDTO')
const LeaveDTO = require('../../dto/Teacher/leaveDTO');




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



async function getLeaveRequests(req , res , next){
    
    const { date }=req.params;
    const id = req.user.class_id
    const schema = Joi.object({
        date: Joi.date().iso().required(),
    })
    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    let leaves;
    let leaveDto = [];
    

    try {
        leaves = await Leave.find({class_id:id , date:date}).populate("student_id")    
    }
    catch (error) {
        return next(error)
    }

    for(let leave of leaves){
        const dto = new LeaveDTO(leave)
        leaveDto.push(dto)
    }

    return res.status(200).json({leaves:leaveDto})

}

async function handleRespondLeaveRequest(req , res , next){

    const {_id , status} = req.body

    const schema = Joi.object({

        _id:Joi.string().regex(mongoDbIdPattern).required(),
        status: Joi.string().valid('Accepted', 'Rejected').required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    try {
        await Leave.updateOne({_id:_id},{
            status
        })
    }
    catch(error){
        return next(error)
    }

    return res.status(200).json({message:status})

}

async function handleCreateAttendence(req , res , next){

    const {date , attendanceList } = req.body;

    const schema = Joi.object({
        date: Joi.date().iso().required(),
        attendanceList: Joi.array().items(Joi.object({
            student: Joi.string().regex(mongoDbIdPattern).required(),
            status: Joi.string().valid('Present', 'Absent' , 'Leave').required()
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
    getStudentsOfClass,
    getLeaveRequests,
    handleRespondLeaveRequest,
}