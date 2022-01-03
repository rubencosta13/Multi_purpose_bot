const mongoose = require('mongoose')

const languageSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    language:       {type: String, required: true, default: 'english'},
    enabled:        {type: Boolean, required: false, default: false}
})

module.exports = mongoose.model('language-schema', languageSchema)