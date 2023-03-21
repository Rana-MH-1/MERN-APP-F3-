const mongoose = require('mongoose');

const  AuthSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }
})

module.exports = mongoose.model('auth', AuthSchema)