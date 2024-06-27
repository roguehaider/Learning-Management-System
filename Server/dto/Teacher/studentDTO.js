class StudentDto{
    constructor(user){
        this._id=user._id,
        this.Fame=user.Fname,
        this.Lname=user.Lname,
        this.roll_No=user.roll_No
    }
}
module.exports=StudentDto