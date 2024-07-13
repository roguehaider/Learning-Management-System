const Remarks = require('../../models/remarks')
const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const remarksDTO = require('../../dto/Teacher/remarksDTO')

async function handlePostRemarks(req , res , next){

    const schema = Joi.object({
        
        reciever: Joi.string().regex(mongoDbIdPattern).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    const {title , description ,reciever} = req.body

    let newRemarks;
    let sender = req.user._id
    try {
        newRemarks = new Remarks({
            title,
            description,
            sender,
            reciever
        });
        await newRemarks.save();
    }
    catch (error) {
        return next(error);
    }
    res.status(201).json({ message: 'remarks posted', remarks: newRemarks });
}

async function handleGetAllRemarks(req , res , next){

    let allRemarks;
    let user = req.user._id;
    let remarksArr=[]
    try {
    allRemarks = await Remarks.find({reciever:user}).populate({
        path: 'sender',
        populate: {
          path: 'class_id',
          model: 'Class'
        }
      })
    }
    catch (error) {
        return next(error)
    }

    for(const remarks of allRemarks ){
        const remarksDto = new remarksDTO(remarks)
        remarksArr.push(remarksDto)
    }
        
    return res.status(200).json({remarks:allRemarks})
}

module.exports={
    handlePostRemarks,
    handleGetAllRemarks
}