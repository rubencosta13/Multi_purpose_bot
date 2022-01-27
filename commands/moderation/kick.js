require('module-alias/register')
const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const {client} = require('../../index')
const mongo = require("@utils/mongo.js")
const punishmentSchema = require('@schemas/punishment-schema.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'u got kicked',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const target = message.mentions.users.first()
            args.shift()
            const reasonToKick = args.join(' ')
            if (!target) return message.reply('Please specify someone to kick')
            const { guild } = message
            const member = guild.members.cache.get(target.id)
            if (member.kickable) {
                
                    await mongo()
                    .then(async (mongoose) =>{
                        try {
                            console.log(target.User.id)
                            await punishmentSchema.findOneAndUpdate(
                                { guildId: guild.id},
                                {
                                    $push: {memberKicked: target.User.id},
                                    $push: {kickReason: reasonToKick}
                                },
                                {upsert: true,new: true}
                            )
                            .then((result) =>{
                                console.log(result)
                            })
                        }catch (e) {
                            console.log(e)
                        }finally {
                            mongoose.connection.close()
                        }
                    })
                member.kick()
                client.users.fetch(target.id).then((user) => {
                    return user.send(`You were kicked from: **${guild.name}**, with the following message: **${reasonToKick}**`)
                })
                message.reply('That user has been kicked')        
            } else {
                message.reply('I cannot kick that user')
            }      
        }catch(e) {
            ErrorHandling(e)
        }
    }
}
