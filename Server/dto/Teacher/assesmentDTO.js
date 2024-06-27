class assesmentDTO {
    constructor(assesment) {
        this._id = assesment._id;
        this.type= assesment.type;
        this.totalMarks= assesment.TotalMarks;
        this.date = assesment.date;
        this.coursename= assesment.course_id.name;
        this.MarksList = assesment.MarksList.map(entry => ({
            student: {
                _id: entry.student._id,
                Fname: entry.student.Fname,
                Lname: entry.student.Lname,
                roll_No: entry.student.roll_No
            },
            obtained_marks: entry.obtained_marks,
            _id: entry._id
        }));
    }
}

module.exports=assesmentDTO