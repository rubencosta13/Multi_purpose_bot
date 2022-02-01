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
            name:'help',
            group: 'misc',
            memberName: 'help',
            description: 'help',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            message.reply(`
            Commands:
            ***moderation:***
            **!kick** kicks member from the guild
            
            `)
        }catch(e) {
            ErrorHandling(e ,guild)
        }

    }
}

// On this bot you have like 10 seconds to type the command
// Bc it is not created on the database
// But on the main, it is created on the database. Making this bot for developing purposes onlyn