const Joi  = require('joi')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Announcements = require('../../models/announcements');

async function handleCreateAnnounce(req , res , next){

    const {title , description}=req.body;

    const createAnnouncementSchema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required()
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
        })

        await newAnnouncement.save()
    } catch (error) {
        return next(error)
    }

    

    res.status(201).json({announcement:newAnnouncement})

}

async function getAllAnnounce(req , res , next){
    const announcements = await Announcements.find({});
    try {
        const announcementsArr = [];
    for(let i=0 ; i<announcements.length ; i++){
        //const dto=new blogDTO(blogs[i])
        announcementsArr.push(announcements[i]);
    }
    return res.status(200).json({announcements:announcementsArr})
    } 
    catch (error) {
        return next(error)
    }
    
}

async function deleteAnnounce(req , res , next){
    
    //validate id
    
    const deleteAnnounceSchema = Joi.object({
        id:Joi.string().regex(mongoDbIdPattern).required()
    })
    const {error} = deleteAnnounceSchema.validate(req.params)

    if(error){
        return next(error)
    }

    const {id} = req.params

    // delete Announcements

    try {
        await Announcements.deleteOne({_id:id})

    } catch (error) {
        return next(error)
    }
    return res.status(200).json({messge:'Announcement deleted'})
}

module.exports={
    handleCreateAnnounce,
    getAllAnnounce,
    deleteAnnounce
}