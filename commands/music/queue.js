const Commando = require('discord.js-commando')
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require("@utils/mongo.js")
const MusicSchema = require('@schemas/music-schema.js')
const Discord = require('discord.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'miscellaneous',
            memberName: 'queue',
            description: 'Shows the queue list',
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
                message.delete({timeout: 3000})
                MusicSchema.find({})
                .then(result => {// do we use that bitch api i dound? yeah how do we install it?
                    //  no install
                    // using axios
                    //what is that?
                    const songs  = result[0].songs 
                    const queueEmbed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setDescription(songs)
                    message.reply(queueEmbed)
                })

                
                .catch(err => {
                    console.error(err)
                })
            }
        }catch(e) {
            
        }
    }
}
