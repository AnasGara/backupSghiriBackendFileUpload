const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const drugSchema = new mongoose.Schema({
    name : requiredString,
    date:String ,
    time:String,
    dersc:String,
    babyID:requiredString
})

module.exports = mongoose.model('drug', drugSchema);


