const Auth = require('../Models/AuthModel')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config()



const Register = async(req,res)=>{
    try {
        const {name,age,email,password,Role} = req.body
        //verify that user has not already an account
        const found = await Auth.findOne({email})
        if(found){
            return res.status(402).json({errors:'You have already registered !'})
        }

        // hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user and save it in the DB
        const newUser = await Auth.create({name,age,email,password:hashedPassword,Role})
        res.status(201).json({newUser,msg:'You have registered successfully'})

    } catch (error) {
        res.status(502).json({message:error})
    }
}

const Login = async(req,res)=>{
    try {
        //verify that the user has an account
        const {email,password} = req.body
        const isfound = await Auth.findOne({email})
        if(!isfound){
            return res.status(403).json({errors:'You have to register before !'})
        }

        // compare the password (req.body) and the password in the DB
        const isMatch = await bcrypt.compare(password, isfound.password)
        if(!isMatch){
            return res.status(401).json({errors:'wrong password!'})
        }

        //generate a token
        const token = await jwt.sign({ id: isfound._id }, process.env.SECRET,{expiresIn:'30d'});
        
        res.status(200).json({token,isfound})

    } catch (error) {
        res.status(502).json({message:error})
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await Auth.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(502).json({message:error})
    }
}

module.exports = {Register,Login,getAllUsers}