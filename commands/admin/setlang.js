const Commando = require('discord.js-commando')
const LanguageSchema = require('@schemas/language-schema')
const mongo = require("@utils/mongo.js")
const { languages } = require('@translation/translations.json')
const { setLanguage } = require("@translation/translations")
const Discord = require('discord.js')
const  isCommandEnabled = require('@utils/enable/enable.js')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'set-lang',
            group: 'miscellaneous',
            memberName: 'admin',
            description: 'Changes Guild\'s language',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild, channel} = message
            if(sCommandEnabled(LanguageSchema, guild.id)){
                return
            }else{  
                if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need to be an administrator in order to run this command")
                const targetLanguage = args[0].toLowerCase()
                if(!targetLanguage){
                    message.reply("You must specify a language")
                    return
                }
                if(!languages.includes(targetLanguage)){
                    message.reply("Language is not supported")
                    return
                }
            
                setLanguage(guild, targetLanguage)
                await mongo()
                .then( async (mongoose) => {
                    try {
                        await LanguageSchema.findOneAndUpdate({_id: guild.id}, {
                            _id: guild.id,
                            language: targetLanguage,
                        },{
                            upsert: true,
                        })
                        const languageDefined = new Discord.MessageEmbed()
                            .setTitle("Language Defined")
                            .setDescription("The bot language for this server is now: **" + targetLanguage.toUpperCase()+"**")
                            .setColor("GREEN")
                        channel.send(languageDefined)
                    }finally {
                        mongoose.connection.close()
                    }
                })
            }
        }catch(e) {
            console.log(e)
        }
    }
}