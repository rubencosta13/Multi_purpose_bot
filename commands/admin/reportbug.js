const url="https://discord.com/api/webhooks/936374172026814565/os6Guv27skR_TzfVTqet1qFDmpt4AsRJh3DmMr3arC69f2b4j6EgW_2C7jVb-LQAdn1l"


const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const axios = require('axios')

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'reportbug',
            group: 'miscellaneous',
            memberName: 'reportbug',
            description: 'reportbug',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
        })
    } 
    async run(message, args) {
        try{
            if (!message.member.hasPermission('ADMINISTRATOR')) return
            const {guild} = message
            const bug = args.join(' ')
            axios.post(url, {
                "username": "Multi Purpose Bot",
                "avatar_url": "",
                "content": "",
                "embeds": [
                {
                    "title": `Bug from: ${guild.name} [ ${guild.id} ]`,
                    "color": 15158332,
                    "description": `Bug: ${bug} `,
                    "timestamp": null,
                    "author": {},
                    "image": {},
                    "thumbnail": {},
                    "footer": {
                    "text": `Fix this asap`
                    },
                    "fields": []
                }
                ],
                "components": []
            })
        }catch(e) {
            ErrorHandling(e)
        }

    }
}