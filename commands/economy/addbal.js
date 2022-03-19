const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const EconomySchema = require("@schemas/economy-schema.js")
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require('@utils/mongo')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'addcoins',
            group: 'economy',
            memberName: 'addcoins',
            description: 'Adds coin to a user',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild, channel} = message
            if(!isCommandEnabled((EconomySchema, guild.id))){
                return
            }else{
                if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("No permission")
                const user = message.mentions.users.first() || message.author
                const quantity = Number(args[1])
                if(!quantity) return message.reply("Insert a valid amount of coins to give")
                await mongo()
                .then(async (mongoose) => {
                    EconomySchema.findOneAndUpdate({ guildId: guild.id, user: user.id }, {$inc: {quantity: quantity}, upsert: true, new: true})
                    .then(async (result) => {
                        const quantity2 = await EconomySchema.findOne({ guildId: guild.id, user: user.id })
                        const balance = new Discord.MessageEmbed()
                            .setFooter("Economy | Fun")
                            .setTimestamp()
                            .setDescription(`${quantity} coins have been added to <@${quantity2.user}> \nNow he has ${quantity2.quantity} coins`)
                        message.channel.send(balance)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
            }
        }catch(e) {
            ErrorHandling(e, guild)
        }

    }
}