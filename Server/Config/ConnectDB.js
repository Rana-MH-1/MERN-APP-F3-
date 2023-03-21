
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

exports.ConnectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(res=> console.log('DB is connected'))
    .catch(err=> console.log(err))
}