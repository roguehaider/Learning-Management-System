const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const assesmentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
      },
    TotalMarks: {
        type: Number,
        required: true,
    },
    MarksList: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        obtained_marks: {
            type: Number,
        }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assesmentSchema, 'assesments');
