require('module-alias/register')
const { client } = require('../../index.js')
const Discord = require('discord.js')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')
const TranslationSchema = require('@schemas/language-schema.js')
const MusicSchema = require('@schemas/music-schema.js')
const NSFWSchema = require('@schemas/nsfw-schema.js')
const memberSchema = require('@schemas/member-schema.js')
const punishmentSchema = require('@schemas/punishment-schema.js')

const ErrorHandling = require('@utils/error/error-handling')

client.on('guildCreate', async (guild) => {
    try{
        await mongo()
        .then(async (mongoose) =>{
            const loggingMethod = new LogSchema({
                _id: guild.id,
                loggingChannel: "NONE",
                ownerId: guild.ownerID,
                state: false, 
                guildName: guild.name
            })
            await loggingMethod.save()
            const translation = new TranslationSchema({
                _id: guild.id,
                language: "en",
            })
            await translation.save()
            const music = new MusicSchema({
                _id: mongoose.Types.ObjectId(),
                guildId: guild.id,
                enabled: false,
            })
            await music.save()
            const nsfw = new NSFWSchema({
                _id: guild.id,
                enabled: false,
            })
            await nsfw.save()
            const serverData = new memberSchema({
                _id: mongoose.Types.ObjectId(),
                guildId: guild.id,
                members: guild.memberCount,
                enabled: true,
            })
            serverData.save()
            const punishment = new punishmentSchema({
                _id: mongoose.Types.ObjectId(),          
                guildId: guild.id,
                enabled: true
            })
            await punishment.save()

        })
        .catch(err => {
            ErrorHandling(err)
        })
    }catch(err) {
        ErrorHandling(err)
    }
})
  
client.on('guildDelete', async (guild) => {
    await mongo()
    .then(async (mongoose) =>{
        await LogSchema.deleteOne({_id: guild.id})
        await TranslationSchema.deleteOne({_id: guild.id})
        await MusicSchema.deleteOne({_id: guild.id})
        await NSFWSchema.deleteOne({_id: guild.id})
        await memberSchema.deleteOne({_id: guild.id})
        await punishmentSchema.deleteOne({_id: guild.id})
    })
    .catch(err => {
        ErrorHandling(err)
    })
})