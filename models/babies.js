const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const babySchema = new mongoose.Schema({
    firstName: requiredString,
    image: String,
    gender: requiredString,
    birthday: {
        type: Date,
        required: true,
    },
    parentID: requiredString
})

module.exports = mongoose.model('baby', babySchema)


