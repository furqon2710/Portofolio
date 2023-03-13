import { where } from "sequelize";
import User from "../models/UserModel.js"
// const mongoose =  require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/NGL')

// const userSchema  =  new mongoose.Schema({
//     username : {
//         type: String,
//         required : true,
//         minLength : 6,
//         maxLength : 20,
//     },
//     fullName : String,
//     email : {
//         type : String,
//         required : true,
//         lowercase:true,
//         minLength : 6,
//         maxLength : 30
//     },
//     password : {
//         type: String,
//         required : true,
//         minLength : 6,
//         maxLength : 30
//     },
//     description : String,
//     isDeleted : {type:Boolean,default:false}
// })

// const messageSchema =  new mongoose.Schema({
//     title : {type:String, maxLength:30},
//     body : {type:String,minLength:5,maxLength:50},
//     date : {type:Date},
//     isDeleted : {type : Boolean,default:false}
// })
// const user = mongoose.model("user",userSchema)
// const message =  mongoose.model("message",messageSchema)
export const getUsers =  async(req,res) =>{
    try{
        const response =  await User.findAll();
        res.status(200).json(response)
    } catch(err){
        console.log(err.message)
    }
}

export const getUsersById =  async(req,res) =>{
    try{
        const response =  await User.findOne({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response)
    } catch(err){
        console.log(err.message)
    }
}

export const createUser =  async(req,res) =>{
    try{
        await User.create(req.body)
        console.log(req.body)
        res.status(201).json({msg:"User created!"})  
    } catch(err){
        console.log(err.message)
    }
}

export const updateUser =  async(req,res) =>{
    try{
        await User.update(req.body,{
            where:{
                id: req.params.id 
            }
        })
        res.status(201).json({msg:"DB Updated!"})  
    } catch(err){
        console.log(err.message)
    }
}

export const deleteUser =  async(req,res) =>{
    try{
        await User.destroy({
            where:{
                id:req.params.id
            }
        })
        res.status(201).json({msg:"User Deleted!"})  
    } catch(err){
        console.log(err.message)
    }
}
