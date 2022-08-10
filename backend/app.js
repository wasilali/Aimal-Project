const express=require('express')


const app=express()
//ya dono img ka show krwany ka leya ha
const bodyParser = require("body-parser")
const fileUploader= require("express-fileupload")
const cookieParse=require("cookie-parser")
// const dot =require("dotenv")

const path=require("path")


const errorMeddleware=require("./meddleware/error")
//config

app.use(express.json())
app.use(cookieParse())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUploader())

//route
const user=require("./routes/userRoute")
const profile=require("./routes/profileRoute")
const post=require("./routes/postRoute")


app.use('/api/v2',user);

app.use('/api/v2',profile);

app.use('/api/v2',post);


app.use(errorMeddleware)


module.exports=app;