const mongoose = require('mongoose')

const economySchema = mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    guildId:        {type: String, required: true, sparse: true},
    user:           {type: String, required: false, default: ''},
    quantity:       {type: Number, required: false, default: 0},
    enabled:        {type: Boolean, required: true, default: false},
})

module.exports = mongoose.model('economy-system', economySchema)