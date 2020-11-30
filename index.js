const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//Routes
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require('dotenv').config();

const uri = process.env.DATABASE_URL;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})


mongoose.connection.once('open',()=>{
    console.log("Running Database")
});

app.use('/api', userRoute);
app.use('/product', productRoute)


const PORT = process.env.PORT || 3006

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} port`)
})