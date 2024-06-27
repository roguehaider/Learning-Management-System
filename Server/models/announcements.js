const mongoose = require('mongoose')
const {Schema } = require('mongoose');

const annoucementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement' ,annoucementSchema ,"announcements");


