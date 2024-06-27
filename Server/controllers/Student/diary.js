const Joi = require('joi');
const User = require('../../models/user')
const Diary = require('../../models/diary');
const DiaryDTO = require('../../dto/Student/diaryDTO')
async function handleGetDiary(req , res , next){
    
    const schema = Joi.object({
        date: Joi.date().iso().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return next(error);
    }

    const { date }=req.params
    const user_id = req.user._id;
    let user;
    let class_id;
    
    try {
        user = await User.findOne({_id:user_id})

        class_id=user.class_id;
    }
    catch (error) {
        next(error)    
    }

    let allDiaries;
    let diaryDto =[];

    try {
        allDiaries = await Diary.find({course_class_id:class_id , date:date}).populate('course_id')    
    }
    catch (error) {
        next(error)
    }
    for(const d of allDiaries){
        const diary = new DiaryDTO(d)
        diaryDto.push(diary)
    }

    return res.status(200).json({diary:diaryDto})
}

module.exports={
    handleGetDiary
}