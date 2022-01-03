const Commando = require('discord.js-commando')
const Language = require("../utils/translation/translations")
const Discord = require('discord.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'miscellaneous',
            memberName: 'fun',
            description: 'Sums 2 numbers together',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['sum'],
        })
    }
    async run(message, args) {
        try{
            const { guild } = message
            const number1 = Number(args[0])
            const number2 = Number(args[1])
            return message.reply(`${Language(guild, 'THE_SUM_IS')} ${number1 + number2}`)
        }catch(e) {
            const {client} = message
            const logchannel = client.channels.cache.get('926906185930645505') 
            logchannel.send(`Unfortunately my developer is a dumb guy so I'm filled with errors :slight_smile:`)
            const embed = new Discord.MessageEmbed()
            .setTitle("Error Found")
            .setDescription(e)
            .setColor(`RED`)
            logchannel.send(embed);
        }
    }
}