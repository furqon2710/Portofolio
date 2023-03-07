const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/animal');

const studentSchema = new mongoose.Schema({
    name: String,
    age : Number,
    gender : String
})

const Student =  mongoose.model("Student", studentSchema)

// const Robi =  new Student({
//     name:"Robi Habibi",
//     age: 18,
//     gender: "Male"
// })

const Ica =  new Student({
    name:"Ica Labis",
    age: 18,
    gender: "Female"
})
const Mujib =  new Student({
    name:"Mujiburrahman",
    age: 11,
    gender: "Male"
})
const Randy =  new Student({
    name:"Randy Pabibi",
    age: 18,
    gender: "Male"
})
const Aisyah =  new Student({
    name:"Aisyah Khansa",
    age: 18,
    gender: "Female"
})
// Robi.save().then(() => console.log('data berhasil ditambah'));
Student.insertMany([Ica,Mujib,Randy,Aisyah])
    .then(function () {
        console.log("Successfully saved defult items to DB");
    })
    .catch(function (err) {
        console.log(err);
    });