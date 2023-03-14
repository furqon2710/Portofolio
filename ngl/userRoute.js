const express = require('express');
const router =  express.Router()
const {User,Message}  =  require('./model')
const jwt =  require('jsonwebtoken')

router.post('/register',(req, res) => {
    console.log('request accepted')
    console.log(req.body)
    // Checking is there any missing fields
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.fullname) {
        res.status(400).send('Error: Missing required fields.')}
    // Checking is the email and username is unique?
    User.exists({ $or: [{ username: req.body.username }, { email: req.body.email }] })
    .then(function(exist){
        if(exist){
            res.status(400).send('Error: Duplicate username or email');
        }else{
            const data =  new User(req.body)
            data.save().then(() => res.status(200).send('data berhasil ditambah')).catch(function(err){
                console.log(err)
                res.status(500).send('Error: Internal server error');
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })
    // convert json to fit in the structure

})
module.exports = router

router.get('/admin/user',(req,res) => {
    User.find({isDeleted:false}).limit(20)
    .then(function(user){
        res.status(200).send(user)
    }).catch(function(error){
        res.status(500).send('Error: Internal server error')
    })
})
// softdelete api
router.post('/admin/delete',(req,res)=>{
    console.log('request accepted')
    target = req.body.username
    User.updateOne({username:target},{isDeleted:true})
    .then(function(){
        console.log(`berhasil hapus data dengan username ${target}`)
    }).catch(function(err){
        console.log(err)
    })
})

router.post('/user/update',(req,res)=>{
    res.status(500).send('this method is on progress')
})

router.post('/message/:id',(req,res)=>{
    console.log('request accepted')
    username =  req.params.id
    if (!req.body.body) {
        res.status(400).send('Error: Missing required fields.')}
    const message =  req.body
    message.date =  new Date()
    User.findOne({username:username}).then(function(user){
        console.log(user)
        message.receiver=user
        console.log(message)
        data  = new Message(message)
        data.save().then(() => res.status(200).send('data berhasil ditambah')).catch(function(err){
            console.log(err)
            res.status(500).send('Error: Internal server error');
        })
    })
})
router.get('/:id/message',(req,res)=>{
    const username = req.params.id

    User.findOne({username:username}).then(function(user){
        Message.find({receiver:user.id}).then(function(msg){
            res.status(200).send(msg)
        }).catch(function(err){ res.status(500).send('Internal server error')})
    }).catch(function(err){
        console.log(err)
        res.status(500).send('Internal server error')
    })
})

router.post('/login',(req,res) => {
    const { username, password } =  req.body
    console.log(`login attempt, username: ${username} password:${password}`)
    authenticateUser(username,password).then(user=>{
        if(user){
            // create jwt token
            const token =  jwt.sign({username:user.username},'secret_key')
            // send token as resp
            res.json({token});
        }else{
            res.status(401).send('Invalid credential')
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send('Internal server error')
    })
})
function verifyToken(req,res,next){
    const header = req.headers['authorization']
    if(typeof header !== undefined){
        // get token from header
        const token =  header.split(' ')[1]
        // verify token
        jwt.verify(bearerToken,'secret',(err,authData) =>{
            if(err) {
                res.status(403).send('Forbidden')
            }else{
                req.authData =  authData
                next();
            }
        })
    }else{
        res.status(401).send('Unauthorized')
    }
}
function authenticateUser(username, password){
    return User.findOne({ username:username })
    .then(user =>{
        console.log(`user found`)
        console.log(user)
        if(user.password==password){
            console.log('password match!')
            return true
        }else{
            return false
        }
    }).catch(err=>{
        console.log(err)
    })
}