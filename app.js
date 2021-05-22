const express = require('express')
const app = express() // var 
const mongoose = require('mongoose') 
const routes = require('./routes')
var cors = require('cors')
const multer = require('multer')
const bodyParser=require('body-parser')

//* dotenv activation
require('dotenv').config()
app.use(cors());

//* connect to db
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, (err) => {
   if (err) throw new Error(err)
   console.log(`connected to db on ${DB_URI}`);
})

//* body parser activation
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//* routes activation
app.use('', routes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})