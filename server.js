const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes
const userRoute = require('./routes/userRoute')

require('dotenv').config()

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())


const uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("Running Database")
})


app.use('/users',userRoute)

const PORT = process.env.PORT || 5000

app.listen(4000,()=>{
    console.log(`srever running on ${PORT}`)
})