class attendenceDTO {
    constructor(assesment) {
        this._id = assesment._id;
        this.type = assesment.type;
        this.TotalMarks = assesment.TotalMarks;
        this.Marks = assesment.MarksList.map(item => ({
            obtained_marks: item.obtained_marks
        }));
    }
}

module.exports=attendenceDTO

