class userDto{
    constructor(user){
        this._id=user._id,
        this.Fame=user.Fname,
        this.Lname=user.Lname,
        this.roll_No=user.roll_No,
        this.role=user.role,
        this.className = user.class_id?.name,
        this.email=user.email
    }
}
module.exports=userDto