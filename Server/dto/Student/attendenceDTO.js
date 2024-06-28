class attendenceDTO {
    constructor(attendance) {
        this._id = attendance._id;
        this.date = attendance.date;
        this.detail = attendance.attendanceList.map(item => ({
            status: item.status
        }));
    }
}

module.exports=attendenceDTO

