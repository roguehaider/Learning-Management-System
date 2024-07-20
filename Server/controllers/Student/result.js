const Joi = require('joi')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const User = require('../../models/user')
const Assesment = require('../../models/assesment');
const Course = require('../../models/course')
const resultDTO = require('../../dto/Student/resultDTO')

async function handleResult(req, res, next) {

    let user = req.user._id
    let class_id = req.user.class_id

    let courses

    try {
        courses = await Course.find({class_id})  
    }
    catch (error) {
        return next(error)
    }

    let ResultDTO = []

    for(let c of courses){
        const assesment = await Assesment.findOne({course_id:c._id,
            'MarksList': { $elemMatch: { student: user } }
        },{
            'MarksList.$': 1, 
           type:1,
           TotalMarks:1
        }).sort({createdAt: -1 }).populate('course_id'); 

        

        const result = new resultDTO(assesment)

        ResultDTO.push(result)

    }


    return res.status(200).json({ResultDTO})
}

module.exports={
    handleResult
}