const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const MusicSchema = require('@schemas/music-schema.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'lyrics',
            group: 'misc',
            memberName: 'lyrics ',
            description: 'lyrics',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(!isCommandEnabled((MusicSchema, guild.id))){
                return
            }else{
                const title = args.join('+')
                const lyrics = await axios.get(`https://some-random-api.ml/lyrics?title=${title}`)
                .catch(err => {
                    message.reply("Error. I didn't found any songs")
                    return    
                })
                const embed = new Discord.MessageEmbed()
                    .setColor('random')
                    .setTitle(`Lyrics from ${lyrics.data.title}`)
                    .setDescription(lyrics.data.lyrics)
                    .setImage(lyrics.data.thumbnail.genius)
                await message.channel.send({embed: embed})
            }
        }catch(e) {
            ErrorHandling(e,guild)
        }

    }
}