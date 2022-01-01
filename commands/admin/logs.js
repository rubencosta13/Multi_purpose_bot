const Commando = require('discord.js-commando')
const LogSchema = require('@schemas/log-schema.js')
const mongo = require('@utils/mongo.js')


module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'set-logs',
            group: 'admin',
            memberName: 'admin',
            description: 'Sums 2 numbers together',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    }
    async run(message, args) { //olaaaaaaaaaaaaaaaaaaaaaaa // OLA || i continue dash? // Sure // I almost have a command ready to test 
        try{
            await mongo()
            .then(async (mongoose) =>{
                if (!message.member.hasPermission('ADMINISTRATOR')) return
                const logChannel = message.channel.id
                const {guild} = message
                LogSchema.findOneAndUpdate({_id: guild.id},
                    {
                        loggingChannel: logChannel,
                        // state: true
                    },{
                    new: true
                    }
                )
                .then(result => {
                    message.reply(`Logs channel defined`)
                    .then(async (message) => {
                        message.delete({timeout: 4000})
                        await LogSchema.findOneAndUpdate({_id: guild.id},
                            {
                                state: true
                            },{
                            new: true
                            }
                        )
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        }catch(e) {
// want me to try to make logo?
// Yeah, and what about name?
// wait what type of domain will we get for the bot and if u want the 3 euro i got in the paypal i can buy domain
// when u reply focus me
        }
    }
}