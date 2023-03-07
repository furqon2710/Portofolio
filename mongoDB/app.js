const express = require('express')
const app = express()
const port = 3000

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', (req, res) => {
    const buah = [{
        nama:'jeruk'},
        {nama:'rambutan'},
        {nama:'bidara'}]
    res.render('index',{
        name:'furqon',
        age : 23,
        buah : buah
    })
    })
app.get('/:name', (req,res) => {
    res.send(`Nama saya : ${req.params.name}`)
})
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})