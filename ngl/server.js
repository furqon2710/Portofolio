const express = require('express')
const bodyParser =  require('body-parser')
const mongoose =  require('mongoose')
const router = require('./userRoute.js')
// set port
const app =  express()
const port  =  3000

// middleware
app.use(bodyParser.json())

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/NGL').then(function(){
    console.log('connected to database!')
})
.catch(function(err){
    console.log(err)
})

app.use('/', router)

app.get('/', (req, res) => {
    res.send('Hello World!');});
// start server
app.listen(port,()=>{
    console.log(`server is running on localhost://${port}`)
})