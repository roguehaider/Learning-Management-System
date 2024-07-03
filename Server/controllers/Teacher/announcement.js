const Joi  = require('joi')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Announcements = require('../../models/announcements');

async function handleCreateAnnouncement(req , res , next){

    const {title , description , course_id}=req.body;

    const createAnnouncementSchema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        course_id:Joi.string().regex(mongoDbIdPattern)
    })
    const {error} = createAnnouncementSchema.validate(req.body)

    if(error){
        return next(error)
    }
    let newAnnouncement;
    
    try {
        newAnnouncement = new Announcements({
            title,
            description,
            course_id

        })

        await newAnnouncement.save()
    } catch (error) {
        return next(error)
    }

    

    res.status(201).json({announcement:newAnnouncement})

}
module.exports={
    handleCreateAnnouncement,
}