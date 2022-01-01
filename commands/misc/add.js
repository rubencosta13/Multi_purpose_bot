const Commando = require('discord.js-commando')

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
            const number1 = Number(args[0])
            const number2 = Number(args[1])
            return message.reply(`The sum is ${number1+number2}`)
        }catch(e) {
            const {client} = message
            const logchannel = client.channels.cache.get('926811907279704114') 
            logchannel.send(`<@&925110058889654362> unfortunately my developer is a dumb guy so I'm filled with errors :slight_smile:`)
            const embed = new Discord.MessageEmbed()
            .setTitle("Error Found")
            .setDescription(e)
            .setThumbnail("https://cdn.discordapp.com/attachments/922941804029034567/922941830188912820/My_project_1.png")
            .setColor(`RED`)
            logchannel.send(embed);
        }
    }
}