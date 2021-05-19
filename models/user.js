const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: String,
    town: String,
    password: requiredString,
    email: requiredString
})

module.exports = mongoose.model('user', userSchema)