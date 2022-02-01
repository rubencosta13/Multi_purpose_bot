const { client } = require('@root/index')
const Discord = require('discord.js')

module.exports = async function ErrorHandling(error, guild){
    try {
        const channel = client.channels.cache.get('926922757860626482')
        const embed = new Discord.MessageEmbed()
        .setTitle("Error Found")
        .setDescription(error)
        .setColor(`RED`)
        .addField("Guild", guild ? guild: "", true)
        .setTimestamp()
        channel.send(embed);
    }catch(e){
        console.log(e)
    }
}