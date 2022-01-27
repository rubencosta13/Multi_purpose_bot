// const axios = require('axios')
// const ErrorHandling = require('@utils/error/error-handling')
// const Commando = require('discord.js-commando')
// const Discord = require('discord.js')
// const isCommandEnabled = require('@utils/enable/enable.js')
// const mongo = require("@utils/mongo.js")
// const MusicSchema = require('@schemas/music-schema.js')

// module.exports = class online extends Commando.Command {
//     constructor(client) {
//         super(client, {
//             name:'4k',
//             group: 'misc',
//             memberName: 'shows 4k ',
//             description: '4k',
//             argsType: 'multiple',
//             permission: 'ADMINISTRATOR',
//         })
//     }
//     async run(message, args) {
//         try{
//             const {guild} = message
//             if(!isCommandEnabled(MusicSchema, guild.id)){
//                 return
//             }else{
                
//             }
//         }catch(e) {
//             ErrorHandling(e)
//         }

//     }
// }