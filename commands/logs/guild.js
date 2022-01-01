const { client } = require('../../index.js')
const Discord = require('discord.js')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')


client.on('guildCreate', async (guild) => { // When Bot Is Added To New Server
    console.log(guild.ownerID)
    await mongo()
    .then(async (mongoose) =>{
        const loggingMethod = new LogSchema({
            _id: guild.id,
            loggingChannel: "NONE",
            ownerId: guild.ownerID,
            state: false
        })
        await loggingMethod.save()
    })
    .catch(err => {

    })
})
  
client.on('guildDelete', async (guild) => { // When Bot Is Removed From Server
    await mongo()
    .then(async (mongoose) =>{
        await LogSchema.deleteOne({_id: guild.id})
    })
    .catch(err => {

    })
})