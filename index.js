require('module-alias/register')
const { MongoClient } = require('mongodb')
const MongoDBProvider = require('commando-provider-mongo')
const Commando = require('discord.js-commando')
require('dotenv').config()
const colors = require('colors')
const config = require('./config.json')
const path = require('path')
const { loadLanguages } = require('@translation/translations')


const client = new Commando.CommandoClient({
	partials: ["MESSAGE"],
	owner: ['573998055037206540','558684577506525195'],
	commandPrefix: config.prefix,
	disableEveryone: false
})

 client.setProvider(
    MongoClient.connect(process.env.MongoURL, {
        useUnifiedTopology: true,
    })
    .then(client => {
        console.log('['+"DB ".green+'] Started Successfully')
        return new MongoDBProvider(client, "BOT_DATABASE")
    })
    .catch(err => {
        console.log(err)
    })
)





client.on('ready', () => {
    
    const status = [
        "Auto Moderation Bot",
        "Invite me using !invite",
        "Have a nice day!",
        "Stay Safe!"
    ]
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (status.length - 1) + 1);
        const newActivity = status[randomIndex];
        client.user.setActivity(newActivity);
      }, 10000);
    console.log('['+"BOT".green+'] Started Successfully')
    

    client.registry
        .registerGroups([
            ['miscellaneous', 'miscellaneous commands'],
            ['misc', 'miscellaneous commands'],
            ['moderation', 'moderation commands'],
            ['mod', 'moderation commands'],
            ['economy', 'economy commands'],
            ['administration', 'administration commands'],
            ['admin', 'administration commands'],
        ])
        .registerCommandsIn(path.join(__dirname, 'commands'))

        loadLanguages(client)
})

client.login(process.env.DC_BOT_TOKEN)
const owner = ['573998055037206540','558684577506525195']

module.exports = {
    client,
    owner
}
