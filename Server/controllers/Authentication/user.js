const Joi = require('joi')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const RefreshToken =require('../../models/token')
const JWTService=require('../../services/JWTService')
const passwordPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const userDTO = require('../../dto/Authentication/userDTO')
const tUserDTO = require('../../dto/Authentication/tUserDTO')
const adminDTO = require('../../dto/Authentication/adminDTO')

async function handleUserLogin(req , res , next){
    const {email , password} = req.body;

    // 1 validate user login
    const userLoginSchema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(passwordPattern).required(),
    })
    const {error} = userLoginSchema.validate(req.body);

    if(error){
        return next(error)
    }
    // 2 match password

    let user;
    try {
         user=await User.findOne({email}).populate("class_id")
       if(!user){
        const error ={
            status:401,
            message:'invalid email'
        }
        return next(error)
       }
       const match = await bcrypt.compare(password , user.password)
       if(!match){
        const error={
            status:401,
            message:'wrong password'
        }
        return next(error)
       }
    } catch (error) {
        return next(error)
    }
    const accessToken = JWTService.signAccessToken({_id:user._id},'30m')
    const refreshToken = JWTService.signRefreshToken({_id:user._id},'60m')

    //update refresh token
    try {
        await RefreshToken.updateOne({
            _id:user._id
        },{
            token:refreshToken
        },{
            upsert:true
        })
    } catch (error) {
        return next(error)
    }

   res.cookie('accessToken',accessToken,{
    maxAge:1000*60*60*24,
    httpOnly:true
   })
   res.cookie('refreshToken',refreshToken,{
    maxAge:1000*60*60*24,
    httpOnly:true
   })

   if(user.role==="Student"){
    const userDto = new userDTO(user)
    return res.status(200).json({user:userDto,auth:true, accessToken:accessToken, refreshToken:refreshToken })
   }
   if(user.role==="Teacher"){
    const tUserDto = new tUserDTO(user);
    return res.status(200).json({user:tUserDto,auth:true, accessToken:accessToken, refreshToken:refreshToken})
   }

   const adminDto = new adminDTO(user);

   return res.status(200).json({user:adminDto,auth:true, accessToken:accessToken, refreshToken:refreshToken})
}
async function handleUserLogout(req , res , next){
    const {refreshToken , accessToken} = req.cookies;
    try {
        RefreshToken.deleteOne({token:refreshToken})
    } catch (error) {
        return next(error)
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({user:null , auth:false})
}
async function handleRefreshToken(req , res , next){

    // 1 get refresh token from cookies
    const originalRefreshToken = req.cookies.refreshToken;

    // 2 verify refresh token
    let id;
    try {
        id=JWTService.verifyRefreshToken(originalRefreshToken)._id
    } catch (e) {
        const error ={
            status:401,
            message:'Unothorized'
        }
        return next(error)
    }
    //  verify from db
    try {
        const match = RefreshToken.findOne({_id:id , token:originalRefreshToken})

        if(!match){
            const error ={
                status:401,
                message:'Unothorized'
            }
            return next(error)
        }
    } catch (error) {
        return next(error)
    }
    // 3 generate new token 
    const accessToken = JWTService.signAccessToken({_id:id},'30m')

    const refreshToken = JWTService.signRefreshToken({_id:id},'60m') 
    
    // 4 update in db 
    
    try {
        
        await RefreshToken.updateOne({
            _id:id
        },{
            token:refreshToken
        })
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24,
            httpOnly:true
           })
           res.cookie('refreshToken',refreshToken,{
            maxAge:1000*60*60*24,
            httpOnly:true
           })

    } catch (error) {
        return next(error)
    }
    
    // 5 send response
    const user = await User.findOne({_id:id}).populate("class_id")
    if(user.role==="Student"){
        const userDto = new userDTO(user)
        return res.status(200).json({user:userDto,auth:true})
       }
    
        const tUserDto = new tUserDTO(user);
        return res.status(200).json({user:tUserDto,auth:true})
    


}
module.exports={
    handleUserLogin, 
    handleUserLogout,
    handleRefreshToken
}