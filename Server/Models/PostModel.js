const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:String,
    Des: String,
    owner:{
        type: mongoose.Types.ObjectId,
        ref:'auth'
    },

    Image: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('Post',PostSchema )