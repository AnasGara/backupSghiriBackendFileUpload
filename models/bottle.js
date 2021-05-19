const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const babySchema = new mongoose.Schema({
    quantity: {
        required: true,
        type:Number
    },
    date:requiredString ,
    babyID:requiredString
})

module.exports = mongoose.model('bottle', babySchema);


