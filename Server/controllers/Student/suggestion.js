const Joi  = require('joi')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Suggestion = require('../../models/suggestion');
const SuggestionDTO = require('../../dto/Teacher/suggestionDTO');
const SsuggestionDTO = require('../../dto/Admin/suggestionDTO');
async function handleCreateSuggestion(req , res , next){

    const {title , description}=req.body;

    const createSuggestionSchema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
    })
    const {error} = createSuggestionSchema.validate(req.body)

    if(error){
        return next(error)
    }

    const poster = req.user._id
    let newSuggestion;
    try {
        newSuggestion = new Suggestion({
            title,
            description,
            poster
        })

        await newSuggestion.save()
    } catch (error) {
        return next(error)
    }

    res.status(201).json({message:'Suggestion posted'})

}
async function getAllsuggestions(req , res , next){

    const suggestions = await Suggestion.find({}).populate('poster')
    try {
        const suggestionDTO = [];
    for(let i=0 ; i<suggestions.length ; i++){
        if(suggestions[i].poster.role==="Teacher"){
            const suggestionDto= new SuggestionDTO(suggestions[i])
            suggestionDTO.push(suggestionDto)
        }
        else if(suggestions[i].poster.role==="Student"){
            const suggestionDto = new SsuggestionDTO(suggestions[i])
            suggestionDTO.push(suggestionDto)
        }
    }
    return res.status(200).json({suggestions:suggestionDTO})
    } catch (error) {
        return next(error)
    } 
}

async function getSuggestionsByUser(req, res, next) {

    const id = req.user._id;

    try {
        // Find suggestions posted by the specific user
        const suggestions = await Suggestion.find({ poster: id });

        res.status(200).json({ suggestions:suggestions });
    } catch (error) {
        return next(error);
    }
}

async function deleteSuggestion(req , res , next){
    
    //validate id
    
    const deleteSuggestionSchema = Joi.object({
        id:Joi.string().regex(mongoDbIdPattern).required()
    })
    const {error} = deleteSuggestionSchema.validate(req.params)

    if(error){
        return next(error)
    }

    const {id} = req.params

    // delete Suggestion

    try {
        await Suggestion.deleteOne({_id:id})

    } catch (error) {
        return next(error)
    }
    return res.status(200).json({messge:'Suggestion deleted'})
}


module.exports={
    handleCreateSuggestion,
    getAllsuggestions,
    getSuggestionsByUser,
    deleteSuggestion
}