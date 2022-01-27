require('module-alias/register')
const { client } = require('@root/index.js')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')
const Discord = require('discord.js')
const ErrorHandling = require('@utils/error/error-handling')


client.on('channelCreate', async (channel) => {
    await mongo()
    .then(async (mongoose) =>{ 
        try{
            await LogSchema.findOne({_id: channel.guild.id})
            .then(async (result) => {
                if (result.state === false) return
                if (!result.loggingChannel || result.loggingChannel === "NONE") return
                const loggingChannel = client.channels.cache.get(result.loggingChannel)
                if (!loggingChannel) {
                    await LogSchema.updateOne({_id: channel.guild.id},{
                        "$set": { "loggingChannel": "NONE", "state": true}
                    }, {upsert: true})
                    const noLoggingEmbed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setColor('RED')
                        .addField('Server Name:', channel.guild.name, true)
                        .setTitle("No Logging Channel found! ")
                        .setDescription(`HI! So, it seems that on the server: ${channel.guild.name} the logging channel is missing! Could you please fix it?\nIf you don't want the logs, please use our dashboard and disable logging!`)
                    client.users.fetch(result.ownerId).then((user) => {
                        return user.send(noLoggingEmbed)
                    })
                    
                }else{
                    const fetchedLogs = await channel.guild.fetchAuditLogs({
                        limit: 1,
                        type: 'CHANNEL_CREATE'
                    })
                    const userWhoCreated = fetchedLogs.entries.first()
                    const { executor, target } = userWhoCreated
                    const channelCreated = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setColor('GREEN')
                        .setTitle("Channel Created!")
                        .setDescription(`A channel has been created!\nChannel: <#${channel.id}>`)
                        .addField("User who created the channel",`<@${executor.id}>`)
                        
                    loggingChannel.send(channelCreated)
                }
            })
            .catch((error) => {
                ErrorHandling(error)
            })
        }catch(error) {
            
        }finally{
            mongoose.connection.close()
        }
    })
})

client.on('channelDelete', async (channel) => {
    await mongo()
    .then(async (mongoose) =>{
        try{
            await LogSchema.findOne({_id: channel.guild.id})
            .then(async (result) => {
                if (result.state === false) return
                if (!result.loggingChannel || result.loggingChannel === "NONE") return
                const loggingChannel = client.channels.cache.get(result.loggingChannel)
                if (!loggingChannel) {
                    await LogSchema.updateOne({_id: channel.guild.id},{
                        "$set": { "loggingChannel": "NONE", "state": true}
                    }, {upsert: true})
                    const noLoggingEmbed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setColor('RED')
                        .addField('Server Name:', channel.guild.name, true)
                        .setTitle("No Logging Channel found! ")
                        .setDescription(`HI! So, it seems that on the server: ${channel.guild.name} the logging channel is missing! Could you please fix it?\nIf you don't want the logs, please use our dashboard and disable logging!`)
                    client.users.fetch(result.ownerId).then((user) => {
                        return user.send(noLoggingEmbed)
                    })
                    
                }else{
                    const fetchedLogs = await channel.guild.fetchAuditLogs({
                        limit: 1,
                        type: 'CHANNEL_DELETE'
                    })
                    const userWhoDeleted = fetchedLogs.entries.first()
                    const { executor, target, changes } = userWhoDeleted
                    const channelDeleted = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setColor('RED')
                    .setTitle("Channel Deleted!")
                    .setDescription(`A channel has been deleted!\nChannel: ${changes[0].old}`)
                    .addField("Channel Id: ", channel.id)
                    .addField("User who deleted the channel",`<@${executor.id}>`)

                loggingChannel.send(channelDeleted)
                }
            })
            .catch((error) => {
                ErrorHandling(error)
            })
        }catch(error) {
        }finally{
            mongoose.connection.close()
        }
    })
})


