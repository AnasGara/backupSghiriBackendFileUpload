const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const sleepSchema = new mongoose.Schema({
    duree: requiredString,
    date: {
        required: true,
        type:Date
    },
    babyID:requiredString
})

module.exports = mongoose.model('sleep', sleepSchema);


