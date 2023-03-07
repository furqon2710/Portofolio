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

// Update data based on name column
const Student =  mongoose.model("Student", studentSchema)
Student.updateOne({name:"Mujiburrahman"},{age:19})
.then(function () {
    console.log('Data berhasil di update')
})
.catch(function (err) {
    console.log(err);
});

// Create data that want to delete 
const DelMePls = new Student({
    name:"Delete Me",
    age: 18,
    gender: "Female"
})
// DelMePls.save().then(() => console.log('data succesfully added'));

// Delete data based on name column
Student.deleteOne({name:'Delete Me'}).then(() => console.log('data deleted succesfully')).catch(function (err) {console.log(err);});