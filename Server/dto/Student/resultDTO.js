class resultDTO {
    constructor(assesment) {
        this.courseName=assesment?.course_id?.name
        this.type = assesment?.type;
        this.TotalMarks = assesment?.TotalMarks;
        this.Marks = assesment?.MarksList.map(item => ({
            obtained_marks: item.obtained_marks
        }));
    }
}

module.exports=resultDTO

