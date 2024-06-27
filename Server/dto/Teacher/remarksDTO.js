class remaksDTO {
    constructor(remarks) {
        this._id = remarks._id,
        this.title=remarks.title,
        this.description=remarks.description,
        this.studentFName=remarks.sender.Fname,
        this.studentLName=remarks.sender.Lname,
        this.roll_No=remarks.sender.roll_No,
        this.className=remarks.sender.class_id.name
        this.date=remarks.createdAt
    }
}

module.exports=remaksDTO