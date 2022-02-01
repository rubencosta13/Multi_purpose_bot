const mongoose = require('mongoose')

const tictactoeSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    guildId:        {type: String, required: true},
    messageId:      {type: String, required: true},
    enabled:        {type: Boolean, required: true, default: true},
})

module.exports = mongoose.model('tictactoe-system', tictactoeSchema)