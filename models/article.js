const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const articleSchema = new mongoose.Schema({
    title: requiredString,
    image: String,
    content: requiredString,
    subject: String,
    date: Date
})

module.exports = mongoose.model('article', articleSchema)


