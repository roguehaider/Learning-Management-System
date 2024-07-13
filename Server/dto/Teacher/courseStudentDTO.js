class courseStudentDTO {
    constructor(course) {
       
        this.courseStudents = {
            students: course.class_id?.students.map(student => ({
                _id: student._id,
                Fname: student.Fname,
                Lname: student.Lname,
                roll_No: student.roll_No
            }))
        };
    }
}

module.exports = courseStudentDTO;
