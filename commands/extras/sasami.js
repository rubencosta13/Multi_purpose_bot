
const { client } = require("../../index.js") 
const Discord = require("discord.js") 

// Stays separated from index.js
// less confusing code
// ok boss
// who careS lol
// WE! DEVS
// LOLOLOL

client.on("message", (msg) => {
  
  const allowedIds = ["573998055037206540"]
   const args = ["fuck","shit", "bukkake", "baka", 
  "suck", "ass", "bullshit", "bs", "but", "ass", "bitch", "dumb", "stupid", "bodoh", "cunt", "bastard", "bollocks", "pussy",
  "twat", "wanker", "bloody hell", "cibai", "nigga", "nigger"
] 
for( const words of args ) {
  if (msg.content === words){
    for (const ids of allowedIds ) {
      if(msg.author.id === ids ) return
    }
    msg.delete() 
    const wordLen = words.length-2
    msg.reply(`The word ${words.slice(0,2)}${wordLen} is not allowed in this server`)
    .then((msg) => {
      msg.delete({ timeout: 10000 }) 
    })}  //what is the timeout 4?
    // is it possible to make something that we put some ppl id and they can bypass the bot?
    
  }
  if (msg.content == "May RockieLucxury giving hope.") {
    msg.reply("Bless RockieLucxury. Main RL bot out.")
  }

  if (msg.content === "!rule 1") {
    msg.delete() 
    msg.reply("➜ no spamming") 
  }

  if (msg.content === "!rule 2") {
    msg.delete() 
    msg.reply("➜ No trolling other users") 
  }

  if (msg.content === "!rule 3 ") {
    msg.delete() 
    msg.reply("➜ Do not bully or harm people") 
  }

  if (msg.content === "!rule 4") {
    msg.delete() 
    msg.reply("➜ No racism or sexism is permitted") 
  }

  if (msg.content === "!rule 5 ") {
    msg.delete() 
    msg.reply("➜ Do not bully or harm people") 
  }

  if (msg.content === "!rule 3 ") {
    msg.delete() 
    msg.reply("➜ Do not bully or harm people") 
  }

  if (msg.content === "!rule 3 ") {
    msg.delete() 
    msg.reply("➜ Do not bully or harm people") 
  }
// wanna contiue the web
  if (msg.content === "!rule 4 ") {
    msg.delete() 
    msg.reply("➜ No racism or sexism is permitted") 
  }

  if (msg.content === "sasami") {
    msg.delete() 
    const embed = new Discord.MessageEmbed().setImage(
      "https://c.tenor.com/1yaDS9VAEdoAAAAC/jackie-chan-yaw.gif"
    ) 
    msg.reply(embed) 
  }
  if (msg.content === "sasami61") {
    msg.delete() 
    const embed = new Discord.MessageEmbed().setImage(
      "https://c.tenor.com/1yaDS9VAEdoAAAAC/jackie-chan-yaw.gif"
    ) 
    msg.reply(embed) 
  }
  if (msg.content === "sas") {
    msg.delete() 
    const embed = new Discord.MessageEmbed().setImage(
      "https://c.tenor.com/1yaDS9VAEdoAAAAC/jackie-chan-yaw.gif"
    ) 
    msg.reply(embed) 
  }


  const goodNightArray = ["gn", "goodnight", "good night", "night night", "nighty nighty"]

  for (const words of goodNightArray) {
    if(msg.content === words){
      msg.delete()
      const embed = new Discord.MessageEmbed()
      .setImage("https://c.tenor.com/mkkrflUxv_gAAAAC/uiiissshhh-baby.gif") // this is not valid!!!
      msg.reply(embed)
    }
  }


  
  if (msg.content === "boo") {
    msg.delete() 
    const embed = new Discord.MessageEmbed().setImage(
      "https://c.tenor.com/t5SA47Q33qMAAAAC/another-fatherless-child-torabi.gif"
    ) 
    msg.reply(embed) 
  }

  if (msg.content === "!rule 5") {
    msg.delete() 
    msg.reply("➜ Do not advertise") 
  }
  if (msg.content === "!rule 6") {
    msg.delete() 
    msg.reply("➜ You must abide by Discord ToS") 
  }

  if (msg.content === "!rule 7") {
    msg.delete() 
    msg.reply("➜ No hacking") 
  }

  if (msg.content === "!rule 8") {
    msg.delete() 
    msg.reply("➜ No account selling or cracking") 
  }

  if (msg.content === "!rule 9") {
    msg.delete() 
    msg.reply("➜ No dark humour") 
  }

  if (msg.content === "!rule 10") {
    msg.delete() 
    msg.reply("➜ Swearing is not permitted") 
  }

  if (msg.content === "!rule 11") {
    msg.delete() 
    msg.reply("➜ NSFW Images are not permitted") 
  }

  if (msg.content === "!rule 12") {
    msg.delete() 
    msg.reply(
      "➜ Asking for support in chat is forbidden, use tickets for support"
    ) 
  }

  if (msg.content === "rey") {
    msg.delete() 
    const embed = new Discord.MessageEmbed().setImage(
      "https://c.tenor.com/qdg13PqYbxMAAAAC/yes-baby.gif"
    ) 
    msg.reply(embed) 
  }




}) 