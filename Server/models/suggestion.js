const mongoose = require('mongoose')
const {Schema } = require('mongoose');

const suggestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    poster:{
      type:Schema.Types.ObjectId,
      ref:'User'
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Suggestion' ,suggestionSchema ,"suggestions");


