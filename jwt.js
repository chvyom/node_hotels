const jwt=require('jsonwebtoken')
require("dotenv").config
const jwtAuthMiddleware=(req,res,next)=>{

    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not Found'})
    //Extract the jwt token from request header
    const token=req.headers.authorization.split(' ')[1]
    if(!token)return res.status(401).json({error: 'Unauthorized'})
    
    try{
        //Verify The JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        //Attach user information to the request object
        req.user=decoded
        next()

    }catch(err){
        console.error(err)
        res.status(401).json({error:'Invalid token'})
    }

}

const generateToken=(userData)=>{
    //Generate a new JWT token using user data
    console.log("JWT_SECRET:",process.env.JWT_SECRET)
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"30d"})

} 

module.exports={jwtAuthMiddleware,generateToken}
