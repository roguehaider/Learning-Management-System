const Attendance = require('../../models/attendence');
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

module.exports = {
    getStudentAttendance}
