class tUserDto{
    constructor(user){
        this._id=user._id,
        this.Fame=user.Fname,
        this.Lname=user.Lname,
        this.id=user.id,
        this.role=user.role,
        this.className = user.class_id?.name,
        this.email=user.email,
        this.IsClassTeacher=user.IsClassTeacher;
        if (user.photoPath) {
            this.photo = user.photoPath;
        }
    }
}
module.exports=tUserDto