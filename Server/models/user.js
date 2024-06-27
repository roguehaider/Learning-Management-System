
const mongoose = require('mongoose')
const {Schema } = require('mongoose');


const userSchema =new Schema({
    id:{
        type:String,
        unique:true
    },
    Fname:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    Lname:{
        type:String,
        required:true,
    },
    roll_No:{
        type:String,
        unique:true
    },
    class_id:{
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    DOB:{
        type:Date,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    photoPath:{
        type:String,
    },
},{timestamps:true});


module.exports=mongoose.model('User' ,userSchema ,"users")
  