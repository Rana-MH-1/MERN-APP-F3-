const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AuthController');
const { AuthMiddleWare } = require('../MiddleWares/AuthMiddleWare');
const { ValidationError } = require('../MiddleWares/ValidationError');
const { Validation } = require('../MiddleWares/Validations');


//sign up 
// register 
router.post('/register',Validation,ValidationError, AuthController.Register )

// Sign In 
router.post('/login',Validation,ValidationError,AuthController.Login )

router.get('/',AuthMiddleWare, AuthController.getAllUsers)




module.exports = router