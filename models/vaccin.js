const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}
const vaccinSchema = new mongoose.Schema({
    vaccinName: requiredString,
    date: requiredString ,    
    babyID: requiredString
})

module.exports = mongoose.model('vaccin', vaccinSchema)


