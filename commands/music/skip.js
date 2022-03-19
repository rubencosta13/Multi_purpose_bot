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
            name: 'skip',
            group: 'miscellaneous',
            memberName: 'skips',
            description: 'Skips a song from the queue',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(!isCommandEnabled(MusicSchema, guild.id)){
                return
            }else{
                const serverQueue = queue.get(message.guild.id);
                skip(message, serverQueue)
            }
        }catch(e) {
            
        }
    }
}


function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
serverQueue.connection.dispatcher.end();
}

