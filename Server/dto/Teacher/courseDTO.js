class CourseDTO {
    constructor(course) {
        this.course_Id = course._id
        this.courseName = course.name,
        this.class_id = {
            _id: course.class_id?._id,
            name: course.class_id?.name,
            totalStudents: course.class_id?.totalStudents,
            students: course.class_id?.students.map(student => ({
                _id: student._id,
                Fname: student.Fname,
                Lname: student.Lname,
                roll_No: student.roll_No
            }))
        };
    }
}

module.exports = CourseDTO;