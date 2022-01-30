const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const NSFWSchema = require('@schemas/nsfw-schema')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'hentai',
            group: 'misc',//for gif what do i do // DUNNO :c
            memberName: 'shows hentai ',
            description: 'hentai',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(isCommandEnabled(NSFWSchema, guild.id)){
                return
            }else{
                axios.get(`https://nekobot.xyz/api/image?type=${this.name}`)//make it so channel is nsfw idk how 2 make it / i have 2 add the ${this.name} to all of the links????m?????????????????????? mhm
                .then( response => {
                    const image  = response.data.message
                    const embed = new Discord.MessageEmbed()
                        .setImage(image)
                        .setColor('RANDOM')   
                        .setURL(image)
                    message.reply(embed)          
                })
                .catch(err => {
                    ErrorHandling(err, guild)
                })
            }
        }catch(e) {
            ErrorHandling(e, guild)
        }

    }
}