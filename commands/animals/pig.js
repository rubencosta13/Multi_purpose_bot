const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const language = require('@utils/translation/translations')
const randomPuppy = require('random-puppy')//here its puupy

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pig',
            group: 'miscellaneous',
            memberName: 'shows a pig',
            description: 'pig',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['matisse', 'mat', 'mati']
        }) // restarttt
    } 
    async run(message, args) {

        try{
            const { guild } = message
            await message.delete()
            pig(message)
        }catch(e) {
            ErrorHandling(e,guild)
        }
        
    }
}


async function pig(message){
    const { guild } = message
    const subReddits = ['pig', 'pigs', 'piggy', 'Pigifs', 'pigifs']
    const random = subReddits[Math.floor(Math.random()*subReddits.length)]
    const image = await randomPuppy(random)
    if(image === undefined) return message.reply("Command failed, please run it again.")
    const embed = new Discord.MessageEmbed()
    .setColor('random')
    .setTitle(`${language(guild, 'PIG_FROM:')} ${random}`)
    .setURL(`https://reddit.com/r/${random}/`)
    .setImage(image)
    await message.channel.send({embed: embed})
}