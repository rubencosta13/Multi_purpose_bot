

const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const MusicSchema = require('@schemas/music-schema.js')

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
            
            axios.get(`https://dog.ceo/api/breeds/image/random`)
            .then(response => {
                const image = response.data.message
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





// so this is all? 
//  no fuck btw ill stop trying 2 get reyna 👀