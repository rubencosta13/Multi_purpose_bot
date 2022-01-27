const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'cat',
            group: 'miscellaneous',
            memberName: 'shows a cat',
            description: 'cat',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            axios.get(`https://api.thecatapi.com/v1/images/search`)
            .then( response => {
                const image  = response.data[0].url
                const embed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setColor('RANDOM')   
                    .setURL(image)
                message.reply(embed)          
            })
            .catch(err => {
                console.log(err)
            })
            
        }catch(e) {
            ErrorHandling(e)
        }

    }
}