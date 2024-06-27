class DiaryDTO {
    constructor(diary) {
        this._id=diary._id,
        this.description=diary.description,
        this.date=diary.date,
        this.courseName=diary.course_id.name
    }
}
module.exports = DiaryDTO;
