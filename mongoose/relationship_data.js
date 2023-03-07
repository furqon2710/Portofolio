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
// Robi.save().then(() => console.log('data berhasil ditambah'));

const classSchema = new mongoose.Schema({
    major_name: {
        type:String,
        required:[true,'insert Major Name is a must!']
    },
    capacity : {
        type:Number,
        required:[true,'insert capacity pls'],
        min:0,
    },
    domain:{
        type:String,
        required:true
    }
}
)
const Kelas =  mongoose.model("Kelas", classSchema)
const kalkulus = new Kelas({
    major_name : "Kalkulus",
    capacity : 100,
    domain : "Indralaya"
})
const fisika  = new Kelas({
    major_name : "Fisika",
    capacity : 100,
    domain : 'Bukit',
})
const robotika = new Kelas({
    major_name : "Robotika",
    capacity :30,
    domain: "Bukit"
})

// robotika.save().then(() => console.log('data berhasil ditambah')).catch(function (err) {console.log(err);});
// fisika.save().then(() => console.log('data berhasil ditambah')).catch(function (err) {console.log(err);});
// kalkulus.save().then(() => console.log('data berhasil ditambah')).catch(function (err) {console.log(err);});
classSchema.add({student:'Array'})
Student.find({gender:'Male'},'name')// mencari siswa dengan gender 'Male'
    .then(function (students) {
        Kelas.updateOne({major_name:'Kalkulus'},{student:students})
    })
    .catch(function (err) {
        console.log(err);
    });