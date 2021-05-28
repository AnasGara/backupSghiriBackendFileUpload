const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const foodSchema = new mongoose.Schema({
    foodName: requiredString,
    descr: String,
    date: String,
    babyID: requiredString
})

module.exports = mongoose.model('food', foodSchema)


