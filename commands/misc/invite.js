const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const NSFWSchema = require('@schemas/nsfw-schema')
//dc
module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'invite',
            group: 'misc',
            memberName: 'invites the bot',
            description: 'invites the bot',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            message.reply(`Invite me using: https://discord.com/api/oauth2/authorize?client_id=830449351292878888&permissions=8&scope=bot`)
        }catch(e) {
            ErrorHandling(e)
        }

    }
}