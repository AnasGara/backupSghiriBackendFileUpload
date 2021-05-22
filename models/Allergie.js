const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const allergieSchema = new mongoose.Schema({
    allergieName: requiredString,
    descrp: requiredString,
    date: requiredString
})

module.exports = mongoose.model('article', articleSchema)