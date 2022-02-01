require('module-alias/register')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const {client, owner} = require('../../index')
const mongo = require("@utils/mongo.js")
const logging = require('@schemas/log-schema.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'updates',
            group: 'moderation',
            memberName: 'updates',
            description: 'updates',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            if (!message.author.id === owner[0] || !message.author.id === owner[1]) return
            await mongo()
                    .then(async (mongoose) =>{
                        logging.find({})
                        .then(result => {console.log(result)})
                        .catch(err => {console.log(err)})
                    })
        }catch(e) {
            ErrorHandling(e, guild)
        }
    }
}
