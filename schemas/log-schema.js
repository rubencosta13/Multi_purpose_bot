const mongoose = require('mongoose')

const loggingSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    loggingChannel: {type: String, required: false},
    ownerId:        {type: String, required: true},
    state:          {type: Boolean, required: true},
})

module.exports = mongoose.model('logging-systems', loggingSchema)