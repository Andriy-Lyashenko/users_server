const express = require('express');
const User = require('../models/user.model')

const route = express.Router();

route.route('/').get((req,res)=>{
    User.find().then(r=> res.json(r)).catch(err=> console.log(err))
})

route.post('/',(req,res)=>{
    const {userName, userLastname, age} = req.body;
    const user = new User({userName, userLastname, age});
    user.save().then(()=> res.json("User added successfully")).catch(err=> console.log(err))
})

route.delete('/:id',(req,res)=>{
    console.log('deleeeeeee',req.params.id)
    User.findByIdAndDelete(req.params.id).then(()=> res.json("User deleted")).catch(err=> console.log(err))
})

module.exports = route