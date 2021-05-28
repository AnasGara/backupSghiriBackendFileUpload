const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const taskSchema = new mongoose.Schema({
    title: requiredString,
    parentID:requiredString
})

module.exports = mongoose.model('task', taskSchema);


