const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const signUpController = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email}).then((user)=>{
        if(user){
            return res.status(409).json({
                message: "Mail exists"
            })
        }else{
            bcrypt.hash(password, 10, (err, hash)=> {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else {
                    const user = new User({
                        email,
                        password: hash
                    });

                    user.save().then(result=> {
                        console.log(result);
                        res.status(201).json({
                            message: 'User has been created'
                        })
                    })
                }
            })
        }
    })
};

const loginController = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email: email}).then(user=>{
        if(!user){
            return res.status(401).json({
                message: 'User doesn\'t exist, mail not found'
            })
        }else {
            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    return res.status(401).json({
                        message: 'Wrong password'
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: '1h'}
                    );

                    return res.status(200).json({
                        message: "Auth succesfull",
                        token
                    })
                }
            })
        }
    }).catch((err=> {
        console.log(err);
        res.status(500).json({
            err
        })
    }))
}

module.exports = {
    signUpController,
    loginController
}