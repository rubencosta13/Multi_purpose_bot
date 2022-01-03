const mongoose = require('mongoose')

const musicSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    songs:          {type: [String], required: false, default: ''},
    enabled:        {type: Boolean, required: true, default: false},
})

module.exports = mongoose.model('music-system', musicSchema)