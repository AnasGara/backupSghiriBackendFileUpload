const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const heightSchema = new mongoose.Schema({
    measure: requiredString,
    date: {
        required: true,
        type:Date
    },
    babyID: requiredString
})

module.exports = mongoose.model('height', heightSchema);


