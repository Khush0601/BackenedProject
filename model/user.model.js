const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minLength:8
    }
})
exports.USER=mongoose.model('user',userSchema)