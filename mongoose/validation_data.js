const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/animal');

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'insert Name is a must!']
    },
    age : {
        type:Number,
        required:[true,'pls insert ur age'],
        min:1,
    },
    gender : String
})
const Student =  mongoose.model("Student", studentSchema)
const Ica =  new Student({
    name:"Ica Labis",
    age: 18,
    gender: "Female"
})

Ica.save().then(() => console.log('data berhasil ditambah'));