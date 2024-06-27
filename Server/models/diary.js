const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const diarySchema = new Schema(
  {

    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    course_class_id:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Diary', diarySchema, "diaries");


