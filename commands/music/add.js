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
            name: 'add',
            group: 'miscellaneous',
            memberName: 'adds music',
            description: 'ads music on the queue',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['adds'],
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(!isCommandEnabled(MusicSchema, guild.id)){
                return 
            }else{
                message.delete({timeout: 3000})
                if (!args[0]) return message.reply("No music specified")
                if (!message.member.voice.channel) return message.reply("You need to be in a voice channel")
                await mongo()
                .then(async (mongoose) => {
                    MusicSchema.findOneAndUpdate({_id: guild.id}, {
                        $push: {songs: args[0]}
                    },{upsert: true,})
                    .then(() =>{
                        message.reply("Music added to queue!")
                        .then((message) => {
                            message.delete({timeout: 3000});
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                })
            }
        }catch(e) {
            ErrorHandling(e)
        }
    }
}


