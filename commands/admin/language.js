const Commando = require('discord.js-commando')
const LanguageSchema = require('@schemas/language-schema')
const mongo = require("@utils/mongo.js")
const { languages } = require('@translation/translations.json')
const { setLanguage } = require("@translation/translations")
const Discord = require('discord.js')
const isCommandEnabled = require('@utils/enable/enable.js')
const ErrorHandling = require('@utils/error/error-handling')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'lang',
            group: 'miscellaneous',
            memberName: 'language',
            description: 'Check Guild\'s language',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild, channel} = message
            if(!isCommandEnabled((LanguageSchema, guild.id))){
                return
            }else{
                if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You need to be an administrator in order to run this command")
                await mongo()
                .then( async (mongoose) => {
                    try {
                        const languageFromServer = await LanguageSchema.findOne({_id: guild.id})
                        const languageDefined = new Discord.MessageEmbed()
                            .setTitle("Language")
                            .setDescription("The bot language for this server is: **" + languageFromServer.language.toUpperCase() + "**")
                            .setColor("GREEN")
                        channel.send(languageDefined)
                    }finally {
                        mongoose.connection.close()
                    }
                })
            }
        }catch(e) {
            ErrorHandling(e)
        }
    }
}