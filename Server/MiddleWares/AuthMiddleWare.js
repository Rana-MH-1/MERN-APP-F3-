require('dotenv').config()
const jwt = require('jsonwebtoken');


exports.AuthMiddleWare = async(req,res,next)=>{
    const Auth_token = req.header('token')
    // verify token 
    const decoded = await jwt.verify(Auth_token, process.env.SECRET );
    if(!decoded){
        return res.json({errors:'You are not authorized!'})
    }
    req.userId = decoded.id
    next()


}