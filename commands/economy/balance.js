const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const EconomySchema = require("@schemas/economy-schema.js")
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require('@utils/mongo')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            group: 'economy',
            memberName: 'balance',
            description: 'Gets the balance of a user',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['bal']
        })
    }
    async run(message, args) {
        try{
            const {guild, channel} = message
            if(sCommandEnabled(EconomySchema, guild.id)){
                return
            }else{
                const user = message.mentions.users.first() || message.author
                await mongo()
                .then(async (mongoose) => {
                    EconomySchema.findOne({ guildId: guild.id, user: user.id })
                    .then((result) => {
                        const balance = new Discord.MessageEmbed()
                            .setFooter("Economy | Fun")
                            .setTimestamp()
                            .setDescription(`<@${result.user}> has ${result.quantity} coins`)
                            .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
                            message.channel.send(balance)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
            }
        }catch(e) {
            ErrorHandling(e,guild)
        }

    }
}