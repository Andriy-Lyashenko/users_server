const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userLastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})


const User = mongoose.model('User',userSchema)

module.exports = User