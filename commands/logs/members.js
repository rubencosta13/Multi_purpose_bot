require('module-alias/register')
const { client } = require('../../index.js')
const Discord = require('discord.js')
const LogSchema = require('@schemas/log-schema.js')
const memberSchema = require('@schemas/member-schema.js')
const ErrorHandling = require('@utils/error/error-handling')
const mongo = require('@utils/mongo.js')

client.on('guildMemberAdd', async (member) => {
    try{
        await mongo()
        .then(async (mongoose) =>{
            await memberSchema.findOneAndUpdate(
                {
                    guildId: member.guild.id
                },
                {   
                    $push: {userJoined: member},
                    $inc: {members: 1}
                },
                {
                    upsert: true,
                    new : true
                }
            )
        })
    }catch(err){
        ErrorHandling(err)
    }
})

client.on('guildMemberRemove', async (member) => {
    try{
        await mongo()
        .then(async (mongoose) =>{
            await memberSchema.findOneAndUpdate(
                {
                    guildId: member.guild.id
                },
                {
                    $push: {userLeft: member},
                    $inc: {members: -1}
                },
                {
                    upsert: true, 
                    new: true
                }
            )
        })
    }catch(err){
        ErrorHandling(err)
    }
})