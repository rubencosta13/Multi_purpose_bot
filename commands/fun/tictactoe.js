const axios = require('axios')
const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'tictactoe',
            group: 'miscellaneous',
            memberName: 'plays tic tac toe',
            description: 'tictactoe',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['ttt']
        })
    }
    async run(message, args) {
        const {guild, channel} = message
        try{
            const player1 = message.author || args[0]
            const player2 = args[1]
            channel.send(`1️⃣|2️⃣|3️⃣\n4️⃣|5️⃣|6️⃣\n7️⃣|8️⃣|9️⃣`)
            .then((message) => {
                message.react("1️⃣")
                message.react("2️⃣")
                message.react("3️⃣")
                message.react("4️⃣")
                message.react("5️⃣")
                message.react("6️⃣")
                message.react("7️⃣")
                message.react("8️⃣")
                message.react("9️⃣")
            })
        }catch(e) {
            ErrorHandling(e, guild)
        }

    }
}