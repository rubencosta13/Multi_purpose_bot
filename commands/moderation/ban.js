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
            name:'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'u got banned',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const target = message.mentions.users.first()
            args.shift()
            const reasonToBan = args.join(' ')
            if (!target) return message.reply('Please specify someone to ban')
            const { guild } = message
            const member = guild.members.cache.get(target.id)
            if (member.bannable) {
                    await mongo()
                    .then(async (mongoose) =>{
                        try {
                            console.log(target)
                            await punishmentSchema.findOneAndUpdate(
                                { guildId: guild.id},
                                {
                                    $push: {memberBanned: target.User.id},
                                    $push: {banReason: reasonToBan}
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
                member.ban()
                client.users.fetch(target.id).then((user) => {
                    return user.send(`You were baned from: **${guild.name}**, with the following message: **${reasonToBan}**`)
                })
                message.reply('That user has been baned')        
            } else {
                message.reply('I cannot ban that user')
            }      
        }catch(e) {
            ErrorHandling(e, guild)
        }
    }
}
