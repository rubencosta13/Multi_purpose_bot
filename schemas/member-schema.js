const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    guildId:        {type: String, required: true, sparse: true},
    userJoined:     {type: [String], required: false},
    userLeft:       {type: [String], required: false},
    members:        {type: Number, required: false, default: 0},
    enabled:        {type: Boolean, required: true, default: true},
})

module.exports = mongoose.model('member-system', memberSchema)