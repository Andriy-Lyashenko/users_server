const express = require('express');
const route = express.Router();
const {signUpController, loginController} = require('../controllers/userController')

route.post('/sign-up', signUpController);

route.post('/login', loginController)


module.exports = route;