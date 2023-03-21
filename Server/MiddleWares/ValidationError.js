const {validationResult} = require('express-validator')

exports.ValidationError = (req,res,next)=>{
    // extract validation Errors 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(401).json({errors:errors.mapped()})
    }
    next()
}