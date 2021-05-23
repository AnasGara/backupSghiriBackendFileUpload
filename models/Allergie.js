const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const allergieSchema = new mongoose.Schema({
    name: requiredString,
    descrp: String,
    date: String,
    babyId:String
})

module.exports = mongoose.model('allergie', allergieSchema)