class attendenceDTO {
    constructor(attendance) {
        this._id = attendance._id;
        this.date = attendance.date;
        this.attendanceList = attendance.attendanceList.map(entry => ({
            student: {
                _id: entry.student._id,
                Fname: entry.student.Fname,
                Lname: entry.student.Lname,
                roll_No: entry.student.roll_No
            },
            status: entry.status,
            _id: entry._id
        }));
    }
}

module.exports=attendenceDTO