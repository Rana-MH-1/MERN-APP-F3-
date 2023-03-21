const Post = require('../Models/PostModel')
const cloudinary = require('../Config/Cloudinary')

const AddPost = async(req,res)=>{
    try {
        const {title,Des} = req.body
        //save image to the DB - cloudinary
        const savedImage = await cloudinary.uploader.upload(req.files.Image.tempFilePath)
        
        const newPost = await Post.create({title,Des,owner : req.userId,Image:{public_id:savedImage.public_id,imgUrl: savedImage.url}})
        res.json({newPost,msg:'Post added successfully!'})
    } catch (error) {
        res.status(502).json({error: error})
    }
}

const getAllPosts = async(req,res)=>{
    try {
        const posts = await Post.find({}).populate({path:'owner', select:'-password -__v'})
        res.json(posts)
    } catch (error) {
        res.status(502).json({error: error})
    }
}

module.exports = {AddPost,getAllPosts}