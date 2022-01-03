const { client } = require('@root/index')
const Discord = require('discord.js')

module.exports = async function ErrorHandling(error){
    const channel = client.channels.cache.get('926922757860626482')
    channel.send(`<@&926902341674881025> unfortunately our developers are  dumb guys, so I'm filled with errors :slight_smile:`)
        const embed = new Discord.MessageEmbed()
        .setTitle("Error Found")
        .setDescription(error)
        .setColor(`RED`)
        .setTimestamp()
    channel.send(embed);
}