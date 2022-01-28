const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const language = require('@utils/translation/translations')
const randomPuppy = require('random-puppy')//here its puupy
const axios = require('axios')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            // It was throwing an error at the console
            name: 'hamster',//.....
            group: 'miscellaneous',
            memberName: 'hamster',
            description: 'hamster',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['hampti', 'hamster']
        }) // restarttt
    } 
    async run(message, args) {

        try{
            await message.delete()
            hamster(message)
        }catch(e) {
            ErrorHandling(e)
        }
        
    }
}


async function hamster(message){
    const { guild } = message
    const hamsterData = await axios.get('https://pixabay.com/api/?key=24992229-6ced542e745b2331ac85f564f&q=hamsters&q=hamster+animal')
    const randNumber =  Math.floor(Math.random() * 25);
    const embed = new Discord.MessageEmbed()
    .setColor('random')
    .setTitle(`Hamster`)
    .setURL(hamsterData.data.hits[randNumber].largeImageURL)
    .addField("Image from", `${hamsterData.data.hits[randNumber].user}`)
    .setImage(hamsterData.data.hits[randNumber].largeImageURL)
    await message.channel.send({embed: embed})
}//restart

// Request terminal so you dont need to ask me
// done