const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const attendanceSchema = new Schema({
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    attendanceList: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }]
},{ timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema , 'attendence');
