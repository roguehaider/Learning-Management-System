class TeacherDto{
    constructor(user){
        this._id=user._id,
        this.Fname=user.Fname,
        this.Lname=user.Lname,
        this.id=user.id,
        this.email=user.email,
        this.class=user.class_id?.name,
        this.DOB = user.DOB,
        this.phone=user.phone;
        if (user.photoPath) {
            this.photo = user.photoPath;
        }
    }
}
module.exports=TeacherDto
