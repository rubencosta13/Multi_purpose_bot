const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'joke',
            group: 'miscellaneous',
            memberName: 'shows a random joke',
            description: 'joke',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            await superagent
                .get('http://icanhazdadjoke.com/')
                .set('Accept', 'application/json')
		        .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Joke`)
                    .setColor('RANDOM')   
                    .setDescription(response.body.joke)
                message.reply(embed)
                .then((message) => {
                    message.react('🤣')
                    message.react('❎')
                })      
                })
            
        }catch(e) {
            ErrorHandling(e, guild)
        }

    }
}