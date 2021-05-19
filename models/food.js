const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const foodSchema = new mongoose.Schema({
    foodName: requiredString,
    quantity: String,
    date: {
        type: Date,
        required: true,
    },
    babyID: requiredString
})

module.exports = mongoose.model('food', foodSchema)


