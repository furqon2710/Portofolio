const express = require('express');
const router =  express.Router()
const {User,Message}  =  require('./model')
const jwt =  require('jsonwebtoken')

router.post('/register',(req, res) => {
    console.log('request accepted')
    console.log(req.body)
    // Checking is there any missing fields
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.fullname) {
        return(res.status(400).send('Error: Missing required fields.'))}
    console.log('through!')
    // Checking is the email and username is unique?
    User.exists({ $or: [{ username: req.body.username }, { email: req.body.email }] })
    .then(function(exist){
        if(exist){
            return(res.status(400).send('Error: Duplicate username or email'));
        }else{
            const data =  new User(req.body)
            data.save().then(() => res.status(200).send('data berhasil ditambah')).catch(function(err){
                console.log(err)
                return(res.status(500).send('Error: Internal server error'));
            })
        }
    })
    .catch(function(err){
        return(console.log(err))
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

router.post('/:username/update',verifyToken,(req,res)=>{
    const id =  req.user.id
    const update = {}
    if(req.body.email){update.email =  req.body.email}
    if(req.body.username){update.username = req.body.username}
    if(req.body.fullName){update.fullName =  req.body.fullName}
    if(req.body.password){update.password = req.body.password}
    if(req.body.description){update.description =  req.body.description}
    User.findOneAndUpdate({_id:id},{$set:update}, {new:true})
    .then(doc =>{
        console.log(doc)
        return res.status(200).send(doc)
    }).catch(err =>{
        console.log(err)
    })
})

router.post('/:username/send_me',(req,res)=>{
    console.log('request accepted')
    username =  req.params.username
    console.log(username)
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
router.get('/:username/mymessage',verifyToken,(req,res)=>{
    user =  req.user
    User.findOne({username:user.username}).then(function(search_result){
        console.log(search_result)
        if(search_result!==null){
            Message.find({receiver:search_result._id}).then(function(msg){
                res.status(200).send(msg)
            }).catch(function(err){ res.status(500).send('Internal server error')})
        }else{
            res.status(400).send('User not found')
        }

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
            console.log('coming through')
            console.log(user)
            const token =  jwt.sign({username:user.username,id:user._id.toString(),role:user.role},'secret_key')
            // send token as resp
            res.json({token});
        }
    }).catch(error => {
        console.log(error)
        if (error.message === 'User not found') {
            res.status(401).send(error.message)
        } else if (error.message === 'Invalid Password') {
            console.log('password salah')
            res.status(401).send(error.message)
        } else {
            // console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } 
    })
})
router.get('/protected',verifyToken,(req,res)=>{
    res.json({message:`welcome ${req.user.username} with id ${req.user.id}`})
})
// ========================AREA FUNCTION====================
function verifyToken(req,res,next){
    const header = req.headers['authorization']
    // console.log(header)
    if(typeof header !== undefined){
        console.log('login')
        // get token from header
        const token =  header.split(' ')[1]
        // verify token
        // console.log(token)
        if(!token){
            return res(401).send('Unauthorized')
        }
        jwt.verify(token,'secret_key',(err,authData) =>{
            if(err) {
                res.status(403).send('Forbidden')
            }else{
                // console.log(authData)
                req.user =  authData
                next();
            }
        })
    }else{
        res.status(401).send('Unauthorized')
    }
}
async function authenticateUser(username, password){
    try {
        const user  = await User.findOne({username:username})
        if(!user){
            throw new Error('User not found')
        }else{
            if(user.password !== password){
                throw new Error('Invalid Password')
            }
        return user;
        }
    } catch(error){
        throw error
    }
}