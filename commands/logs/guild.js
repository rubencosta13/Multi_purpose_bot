require('module-alias/register')
const { client } = require('../../index.js')
const Discord = require('discord.js')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')
const TranslationSchema = require('@schemas/language-schema.js')


client.on('guildCreate', async (guild) => {
    await mongo()
    .then(async (mongoose) =>{
        const loggingMethod = new LogSchema({
            _id: guild.id,
            loggingChannel: "NONE",
            ownerId: guild.ownerID,
            state: false
        })
        await loggingMethod.save()
        const translation = new TranslationSchema({
            _id: guild.id,
            language: "en",
        })
        await translation.save()
    })
    .catch(err => {

    })
})
  
client.on('guildDelete', async (guild) => {
    await mongo()
    .then(async (mongoose) =>{
        await LogSchema.deleteOne({_id: guild.id})
        await TranslationSchema.deleteOne({_id: guild.id})
    })
    .catch(err => {

    })
})