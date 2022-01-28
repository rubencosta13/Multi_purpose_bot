const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')

const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'miscellaneous',
            memberName: 'shows a dog',
            description: 'dog',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            // Use this one ye but the axios.get?
            //i was planning to use redditmhm

            // oh ok for that use the pig. sorry mate
            axios.get(`https://dog.ceo/api/breeds/image/random`)
            .then(response => {
                const image = response.data.message
                const embed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setColor('RANDOM')
                    .setURL(image) //nubbbbbbbbbbbbb
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





