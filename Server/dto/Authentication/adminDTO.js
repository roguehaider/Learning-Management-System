class adminDto{
    constructor(user){
        this._id=user._id,
        this.role=user.role,
        this.email=user.email
    }
}
module.exports=adminDto