const mongoose = require("mongoose");

const dataDB = ()=>{
    mongoose.connect(process.env.DB_URL,{   useNewUrlParser: true,
        useUnifiedTopology: true}).then((data)=>{
        console.log(`database connect hogai ha ${data.connection.host}`);
        })};


module.exports=dataDB;