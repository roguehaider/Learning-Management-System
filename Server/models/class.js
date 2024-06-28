const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    totalStudents: {
        type: Number,
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema, 'classes');
