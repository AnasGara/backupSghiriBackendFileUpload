const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const coucheSchema = new mongoose.Schema({
    etat: requiredString,
    couleur:String,
    date:String,
    babyID:requiredString
})

module.exports = mongoose.model('couche', coucheSchema);


