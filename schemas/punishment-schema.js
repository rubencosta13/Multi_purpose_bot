const mongoose = require('mongoose')

const punishmentSchema = mongoose.Schema({
    _id:            {type: String, required: true},
    guildId:        {type: String, required: true},
    membersWarned:  {type: [String], required: false},
    warnReasons:    {type: [String], required: false},
    memberKicked:   {type: [String], required: false},
    kickReason:     {type: [String], required: false},
    memberBanned:   {type: [String], required: false},
    banReason:      {type: [String], required: false},
    enabled:        {type: Boolean, required: false, default: true},
})

module.exports = mongoose.model('punishment-systems', punishmentSchema)