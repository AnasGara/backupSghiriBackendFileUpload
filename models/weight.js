const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}
const weightSchema = new mongoose.Schema({
    measure: requiredString,
    date: {
        type: String,
        required: true,
    },
    babyID: requiredString
})

module.exports = mongoose.model('weight', weightSchema)


