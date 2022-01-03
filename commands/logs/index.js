require('module-alias/register')
const { client } = require('@root/index.js')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')
const Discord = require('discord.js')


client.on('channelCreate', async (channel) => {
    await mongo()
    .then(async (mongoose) =>{ //she has bf and no sign that they will break up
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
                    const channelCreated = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setColor('GREEN')
                        .setTitle("Channel Created!")
                        .setDescription(`A channel has been created!\nChannel: <#${channel.id}>`)
                        
                    loggingChannel.send(channelCreated)
                }
            })
            .catch((error) => {
                console.log("ERROR:"+error)
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
                    const channelDeleted = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setColor('RED')
                    .setTitle("Channel Deleted!")
                    .setDescription(`A channel has been deleted!\nChannel: <#${channel.id}>`)
                    
                loggingChannel.send(channelDeleted)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }catch(error) {
        }finally{
            mongoose.connection.close()
        }
    })
})


