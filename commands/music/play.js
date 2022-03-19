const ErrorHandling = require('@utils/error/error-handling')
const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const ytdl = require('ytdl-core');
const {queue} = require('@utils/music/queue')
const MusicSchema = require('@schemas/music-schema.js')
const isCommandEnabled = require('@utils/enable/enable.js');
const axios = require('axios');

module.exports = class online extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'miscellaneous',
            memberName: 'plays music',
            description: 'Plays music on a voice chat',
            argsType: 'multiple',
            permission: 'ADMINISTRATOR',
            aliases: ['p', 'tocar', 'music']
        })
    }
    async run(message, args) {
        try{
            const {guild} = message
            if(!isCommandEnabled(MusicSchema, guild.id)){
                return
            }else{
				if (args.length > 0) {
					await message.delete()
					const serverQueue = queue.get(message.guild.id);
					execute(message, serverQueue, args)
				}else{
					message.reply(`No music was found`)
					return
				}
                
            }
            
        }catch(e) {
            console.error(e)
            ErrorHandling(e,guild)
        }
    }
}


async function execute(message, serverQueue, args) {
	if(!args) {
        return message.reply("No song specified!")
    }
	const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.reply("I need the permissions to join and speak in your voice channel!")
    }
	let songId
	let songData
	await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${args}&key=${process.env.YT_AUTH_KEY}`)
	.then(response => {
		songId = response.data.items[0].id.videoId
		songData = response.data.items[0].snippet
	})
	.catch(err => {
		console.log(err)
	})
    const songInfo = await ytdl.getInfo(songId);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };
    if (!serverQueue) {
        const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
        };
		queue.set(message.guild.id, queueContruct);
	
		queueContruct.songs.push(song);
	
		try {
			let connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0], songData, message);
		} catch (err) {
			ErrorHandling(err,guild)
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
    } else {
		serverQueue.songs.push(song);
		const addedToQueue = new Discord.MessageEmbed()
			.setTimestamp()
			.setTitle("Music")
			.setDescription(`${song.title} has been added to the queue!`)
			.setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
			.setColor("Green")
		return message.channel.send(addedToQueue);
    }
}



function play(guild, song, songData, message) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
    }

    const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
	})
		.on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const startPlay = new Discord.MessageEmbed()
		.setTitle("🎶Music🎶")
		.setColor("GREEN")
		.addField("Requested by:", message.author)
      	.setDescription(`Now playing: **${song.title}**`)
		.setImage(songData.thumbnails.high.url)
    serverQueue.textChannel.send(startPlay);
}
