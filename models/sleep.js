const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const sleepSchema = new mongoose.Schema({
   // duree: requiredString,
    dateDebut:String,
    dateFin:String,
    babyID:String
})

module.exports = mongoose.model('sleep', sleepSchema);


