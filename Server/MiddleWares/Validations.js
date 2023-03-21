const {body} = require('express-validator')
exports.Validation = [
    body('email','please put a valid email').isEmail(),
    body('password','password should be at least 6 caracters').isLength({min:6})

]


