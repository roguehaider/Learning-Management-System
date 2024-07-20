const Attendance = require('../../models/attendence');
const Leave = require('../../models/leave')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const AttendanceDTO = require('../../dto/Student/attendenceDTO')

async function getStudentAttendance(req, res, next) {

    const user_id = req.user._id; 


    let attendance;

    let attendanceRecords = [];

    try {
        attendance = await Attendance.find({
            'attendanceList': { $elemMatch: { student: user_id } }
        }, {
            'attendanceList.$': 1, 
            class_id: 1,
            date: 1
        })
        .populate('attendanceList.student', 'Fname Lname roll_No') 
        .populate('class_id', 'name');
    }
    catch(error) {
        return next(error);
    }

    for(const record of attendance){
        const recordDto = new AttendanceDTO(record)
        attendanceRecords.push(recordDto);
    }

    return res.status(200).json({ attendance: attendanceRecords });
}

async function handlePutLeave(req , res , next){

    const {description , date} = req.body;

    const schema = Joi.object({
        description:Joi.string().required(),
        date: Joi.date().iso().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    const student_id = req.user._id;
    const class_id = req.user.class_id

    try {
        
        newLeave = new Leave({
            class_id,
            date,
            student_id,
            description

        })
        newLeave.save();
    }
    catch (error) {
        return next(error);
    }
    return res.status(201).json({message:'Leave Requested'})
}

async function handleGetLeaveStatus(req , res , next){
    const { date} = req.params;
    const student_id = req.user._id
    const schema = Joi.object({
        date: Joi.date().iso().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    let leave;
    let leavestatus;

    try {
        leave= await Leave.findOne({date , student_id})
    }
    catch (error) {
        return next(error)
    }
    leavestatus = leave.status;
    return res.status(200).json({leavestatus:leavestatus})
}

module.exports = {
    getStudentAttendance,
    handlePutLeave,
    handleGetLeaveStatus
}
