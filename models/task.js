const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const taskSchema = new mongoose.Schema({
    title: requiredString,
    date :String,
    parentID:String
})

module.exports = mongoose.model('task', taskSchema);


