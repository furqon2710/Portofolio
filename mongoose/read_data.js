const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/animal');

const studentSchema = new mongoose.Schema({
    name: String,
    age : Number,
    gender : String
})
const Student =  mongoose.model("Student", studentSchema)

list = Student.find({gender:'Male'},'name')// mencari siswa dengan gender 'Male'
    .then(function (students) {
        console.log(students)
    })
    .catch(function (err) {
        console.log(err);
    });
console.log(list)