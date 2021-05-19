const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const pediatreSchema = new mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    town:requiredString,
    adress: requiredString,
    telephone:requiredString
})

module.exports = mongoose.model('pediatre', pediatreSchema)
         

