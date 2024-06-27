const mongoose = require('mongoose')
const {Schema } = require('mongoose');

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    teacher_id:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
     class_id:{
      type:Schema.Types.ObjectId,
      ref:'Class'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course' ,courseSchema ,"courses");


