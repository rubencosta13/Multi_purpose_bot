const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const EconomySchema = require("@schemas/economy-schema.js")
const isCommandEnabled = require('@utils/enable/enable.js')
const mongo = require('@utils/mongo')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name:'pay',
            group: 'economy',
            memberName: 'pay',
            description: 'pays a amount to a user',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(!isCommandEnabled((EconomySchema, guild.id))){
                console.log("False")
                return
            }else{
                console.log("True")
                await mongo()
                .then(async (mongoose) => {
                    if (!message.mentions.users.first()) return message.reply("Mention a user to pay the coins")
                    if (!args[1]) return message.reply("Mention a valid quantity to pay to the user")
                    const userToRemoveCoins = message.author
                    const quantity = parseInt(args[1])
                    const amountToGive = parseInt(args[1])
                    const userToGetCoins = message.mentions.users.first() || args[0]
                    let currentCoins 
                    let doesUserHaveEnoughCoins
                    let isCommandEnabled
                            //                  { guildId: guild.id, user: userToRemoveCoins.id }
                    await EconomySchema.findOne({ guildId: guild.id, user: userToRemoveCoins.id })
                    .then(result => {
                        if(result === null){
                            const addEntryToDb = new EconomySchema({
                                _id: mongoose.Types.ObjectId(),
                                guildId: guild.id,
                                user: userToRemoveCoins.id,
                                quantity: quantity,
                                enabled: false
                            })
                            addEntryToDb.save()
                        }else{
                            isCommandEnabled = result.enabled
                            doesUserHaveEnoughCoins = result.quantity
                            currentCoins = result.quantity
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    if(!doesUserHaveEnoughCoins > parseInt(args[1]) ? true : false ) { 
                        message.reply("You dont have enough coins!")
                        return 
                    }else{
                        if (currentCoins - quantity < 0) {
                            message.reply("Not enough coins")
                            return
                        }
                        EconomySchema.updateOne({ guildId: guild.id, user: userToRemoveCoins.id },
                            {quantity: currentCoins - quantity},
                            {upsert: true},
                        ).then((data) => {
                            EconomySchema.findOne({ guildId: guild.id, user: userToGetCoins.id })
                            .then(async (result, data) => {
                                if (result === null){
                                    const userToBeAddedToDatabase = new EconomySchema({
                                        _id: mongoose.Types.ObjectId(),
                                        guildId: guild.id,
                                        user: userToGetCoins.id,
                                        quantity: amountToGive,
                                        enabled: isCommandEnabled
                                    })
                                    await userToBeAddedToDatabase.save()
                                    const paidSuccessfully = new Discord.MessageEmbed()
                                        .setTimestamp()
                                        .setTitle("Payment")
                                        .setDescription(`User: <@${userToRemoveCoins.id}> has gave ${quantity} coins to <@${userToGetCoins.id}>`)
                                        .setFooter("Economy | Fun")
                                    message.channel.send(paidSuccessfully)
                                }else{
                                    const userData = await EconomySchema.findOne({ guildId: guild.id, user: userToGetCoins.id })
                                    console.log(userData.quantity)
                                    await EconomySchema.findOneAndUpdate({ guildId: guild.id, user: userToGetCoins.id },
                                        {
                
                                                quantity: userData.quantity + amountToGive
                                        
                                        },
                                        {upsert: true, new: true}
                                    )
                                    const paidSuccessfully = new Discord.MessageEmbed()
                                        .setTimestamp()
                                        .setTitle("Payment")
                                        .setDescription(`User: <@${userToRemoveCoins.id}> gave ${quantity} coins to <@${userToGetCoins.id}>`)
                                        .setFooter("Economy | Fun")
                                    message.channel.send(paidSuccessfully)
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                })
            }
        }catch(e) {
            ErrorHandling(e, guild)
        }

    }
}