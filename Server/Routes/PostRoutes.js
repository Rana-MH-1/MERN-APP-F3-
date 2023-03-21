const express = require('express')
const router = express.Router()
const PostController = require('../Controllers/PostControllers')
const { AuthMiddleWare } = require('../MiddleWares/AuthMiddleWare')

router.post('/', AuthMiddleWare,PostController.AddPost)
router.get('/',AuthMiddleWare,PostController.getAllPosts)




module.exports = router