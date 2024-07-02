const bcrypt=require('bcrypt');
const { USER } = require('../model/user.model');

exports.createUser=async(req,res)=>{
 try{
 let userName=req.body.name;
    let userEmail=req.body.email;
    let userPassword=bcrypt.hashSync(req.body.password,8);

    let savedData=await USER.create({
        name:userName,
        email:userEmail,
        password:userPassword
 })
   if(savedData){
        return res.status(201).send({
            message:"user created successfully"
        })
 }
    else{
        return res.status(500).send({
            message:"something went wrong"
        })
    }
  }
  catch(e){
    res.status(500).send({
        message:'something went wrong',
        errorMessage:e.message
    })
  }
}
exports.onLogin=async(req,res)=>{
    try{
     let email=req.body.loginname;
     let password=req.body.password
     if(!email && !password){
        return res.status(401).send({
            message:'enter all required field'
        })
     }

     let userData=await USER.findOne({email:email})
     if(!userData){
        return res.status(401).send({
            message:'credential invalid'
        })
     }
     else{
        let isValid=bcrypt.compareSync(password,userData.password)
        if(isValid){
        return res.status(200).send(userData)
        }
        else{
            return res.status(401).send({
                message:'credential invalid'
            })
        }
     }
    }
    catch(e){
        res.status(500).send({
            message:'something went wrong',
            errorMessage:e.message
        })
    }
}