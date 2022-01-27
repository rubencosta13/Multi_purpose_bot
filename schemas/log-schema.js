const mongoose = require('mongoose')

const loggingSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    loggingChannel: {type: String, required: false, default: 'NONE'},
    ownerId:        {type: String, required: true},
    enabled:        {type: Boolean, required: true, default: false},
    guildName:      {type: String, required: true}
})

module.exports = mongoose.model('logging-systems', loggingSchema)