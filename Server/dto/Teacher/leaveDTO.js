class LeaveDto{
    constructor(leave){
        this._id=leave._id,
        this.description=leave.description,
        this.date=leave.date,
        this.fname=leave.student_id.Fname;
        this.lname=leave.student_id.Lname;
        this.roll_No=leave.student_id.roll_No;
    }
}
module.exports=LeaveDto