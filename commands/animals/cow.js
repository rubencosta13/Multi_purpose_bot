const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const randomPuppy = require('random-puppy')//here its puupy
const language = require('@translation/translations.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'cow',
            group: 'miscellaneous',
            memberName: 'shows a cow',
            description: 'cow',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['rey', 'reyna']
        })
    } 
    async run(message, args) {
        try{
            const { guild } = message
            await message.delete()
            const subReddits = ['cows', 'cow']
            const random = subReddits[Math.floor(Math.random()*subReddits.length)]
            const image = await randomPuppy(random)
            console.log(image)
            const embed = new Discord.MessageEmbed()
            .setColor('random')
            .setTitle(`${language(guild, 'COW_FROM:')} ${random}`)
            .setURL(`https://reddit.com/r/${random}/`)
            .setImage(image)
            message.channel.send({embed: embed})
        }catch(e) {
            ErrorHandling(e)
        }

    }
}