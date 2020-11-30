const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isEmail(value)) throw new Error('Email is invalid');
        }
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


const User = mongoose.model('User',userSchema)

module.exports = User;