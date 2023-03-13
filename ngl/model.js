const mongoose = require('mongoose')

// define user db structure
const userSchema  =  new mongoose.Schema({
    username : {
        type: String,
        required : true,
        minLength : 4,
        maxLength : 20,
        unique:true
    },
    fullName : {
        type: String,
        maxLength : 30,
    },
    email : {
        type : String,
        required : true,
        lowercase:true,
        unique:true
    },
    password : {
        type: String,
        required : true,
        minLength : 6,
        maxLength : 30
    },
    description : String,
    isDeleted : {type:Boolean,default:false}})

// define message db structure
const messageSchema =  new mongoose.Schema({
    title : {type:String, maxLength:30},
    body : {type:String,minLength:5,maxLength:50,required:true},
    date : {type:Date},
    isDeleted : {type : Boolean,default:false},
    receiver:{type:mongoose.Schema.Types.ObjectId,required:true}
},)

const User = mongoose.model("user",userSchema)
const Message =  mongoose.model("message",messageSchema)

module.exports = { User, Message }
