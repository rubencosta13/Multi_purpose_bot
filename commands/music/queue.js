const Commando = require('discord.js-commando')
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const MusicSchema = require('@schemas/music-schema.js')
const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const { queue } = require('@utils/music/queue')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'miscellaneous',
            memberName: 'queue',
            description: 'Shows the music queue',
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
                const serverQueue = queue.get(message.guild.id);
                let songsOnQueue = []
                for (const songs of serverQueue.songs) {
                    songsOnQueue.push(songs.title)
                }
                const queueEmbed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setDescription(`Songs on queue: \n${songsOnQueue}\n`)
                message.reply(queueEmbed)
            }
        }catch(e) {
            console.log(e)
        }
    }
}

