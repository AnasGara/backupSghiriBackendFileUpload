const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const croissanceSchema = new mongoose.Schema({
    poids: requiredString,
    taille: requiredString,
    perimetre: requiredString,
    time: String,
    date: String,
    babyId:String
})

module.exports = mongoose.model('Croissance', croissanceSchema)