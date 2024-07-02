const express=require('express')
const { AppConfig } = require('./config/app_config/app.config')
const mongoose=require('mongoose')
const { db_config } = require('./config/db_config/db.config')
const { USER } = require('./model/user.model')
const { userRoutes } = require('./Router/user.router')
const bcrypt=require('bcrypt');
const app=express()
app.use(express.json())

mongoose.connect(db_config.URL)
const db=mongoose.connection
const onDbInit=async()=>{
   try{
  console.log('create a user')
const userData=await USER.find({})
if(userData.length===0){
    let userName='khushboo';
    let userEmail='ksingh200602@gmail.com';
    let userPassword=bcrypt.hashSync('khushan0601',8);

    let savedData=await USER.create({
        name:userName,
        email:userEmail,
        password:userPassword

    })
    console.log('first user created')
}
 else{
    console.log('user present in database')
   }
}
   catch(e){
    console.log('something went wrong')
   }
}

db.once('open',()=>{
    console.log('database is connected')
    onDbInit()
})
db.on('error',()=>{
    console.log('database not connected')
})
// all routes
userRoutes(app)



app.listen(AppConfig.PORT,()=>{
    console.log(`server is connected at ${AppConfig.PORT}`)
})