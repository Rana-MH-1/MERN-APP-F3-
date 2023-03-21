const express = require('express');
const app = express()
const {ConnectDB} = require('./Config/ConnectDB')
const authRouter = require('./Routes/AuthRoute')
const PostRouter = require('./Routes/PostRoutes')
const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(fileUpload({
    useTempFiles : true
}));

app.use('/api/auth', authRouter)
app.use('/api/posts', PostRouter)


//connect to the DB
ConnectDB()

const PORT = 5000;
app.listen(PORT, err=> err? console.log(err) : console.log(`Server is running on ${PORT}`))