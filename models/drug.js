const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const drugSchema = new mongoose.Schema({
    name : requiredString,
    date: {
        required: true,
        type:Date
    },
    babyID:requiredString
})

module.exports = mongoose.model('drug', drugSchema);


