const User = require("../../models/user");
const Attendance = require('../../models/attendence');

async function handleGetChallan(req, res, next) {
    let user;
    let id = req.user._id;

    try {
        user = await User.findOne({ _id: id }).populate("class_id");
    } catch (error) {
        return next(error);
    }

    const { year, month } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    let attendance;

    try {
        attendance = await Attendance.find({
            date: { $gte: startDate, $lte: endDate },
            'attendanceList': { $elemMatch: { student: id } }
        }, {
            'attendanceList.$': 1,
            class_id: 1,
            date: 1
        })
            .populate('attendanceList.student', 'Fname Lname roll_No')
            .populate('class_id', 'name');
    }
    catch (error) {
        return next(error);
    }

    let fine = 0;
    let Absentees=0;
    attendance.forEach(record => {
        if (record.attendanceList[0].status === 'Absent') {
            Absentees++;
            fine = fine + 50;
        }
    });

    let TutionFee=user.Studentfee
    let totalFee = TutionFee+fine
    const challanData ={
        FName:user.Fname,
        LName:user.Lname,
        class:user.class_id.name,
        roll_No:user.roll_No,
        TutionFee:TutionFee,
        Absentees:Absentees,
        fine:fine,
        month:month,
        DueDate:`10-${month+1}-${year}`,
        total:totalFee
    }

    return res.status(200).json({
        challanData
    });

}

module.exports = {
    handleGetChallan
};
