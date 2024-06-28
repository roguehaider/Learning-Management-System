const Assesments = require('../../models/assesment');
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const AssesmentDTO = require('../../dto/Student/assesmentDTO')

async function getStudentAssementByCourse(req, res, next) {

    const user_id = req.user._id; 
    const { id } = req.params
    
    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoDbIdPattern).required()
    })

    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error)
    }

    let assesments;

    let AssesmentRecords = [];

    try {
        assesments = await Assesments.find({course_id:id,
            'MarksList': { $elemMatch: { student: user_id } }
        },{
            'MarksList.$': 1, 
           type:1,
           TotalMarks:1
        })
    }
    catch(error) {
        return next(error);
    }

    for(const assement of assesments){
        const assesmentDto = new AssesmentDTO(assement)
        AssesmentRecords.push(assesmentDto);
    }

    return res.status(200).json({ attendance: AssesmentRecords });
}

module.exports = {
    getStudentAssementByCourse}
