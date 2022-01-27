const mongoose = require('mongoose')

const loggingSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    kicked_user:    {type: String, required: false, default: 'NONE'},
    reason:         {type: String, required: true},
    author:         {type: Boolean, required: true, default: false},
})

module.exports = mongoose.model('logging-systems', loggingSchema)