const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const rappelSchema = new mongoose.Schema({
    title: requiredString,
    desc:requiredString,
    date: {
        type: Date,
        required:true
    },

    parentID:requiredString
})

module.exports = mongoose.model('rappel', rappelSchema);


