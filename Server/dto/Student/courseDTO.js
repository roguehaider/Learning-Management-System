class CourseDTO {
    constructor(course) {
        this._id=course._id,
        this.name=course.name,
        this.teacher_id = course.teacher_id?._id
        this.teacherFName=course.teacher_id?.Fname,
        this.teacherLName=course.teacher_id?.Lname
    }
}
module.exports = CourseDTO;
