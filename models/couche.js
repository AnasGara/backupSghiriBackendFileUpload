const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const coucheSchema = new mongoose.Schema({
    type: requiredString,
    date: {
        required: true,
        type:Date
    },
    babyID:requiredString
})

module.exports = mongoose.model('couche', coucheSchema);


