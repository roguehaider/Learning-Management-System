const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const leaveeSchema = new Schema({
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type:String,
    }
},{ timestamps: true });

module.exports = mongoose.model('Leaves', leaveeSchema , 'leaves');
