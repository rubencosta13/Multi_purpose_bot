const mongoose = require('mongoose')

const nsfwSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    enabled:        {type: Boolean, required: true, default: false},
})

module.exports = mongoose.model('nsfw-systems', nsfwSchema)