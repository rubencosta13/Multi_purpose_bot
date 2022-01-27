const { client } = require('../../index.js')


client.on('message', async (msg) => {
    
})




// for( const words of args ) {
//     if (msg.content === words){
//       for (const ids of allowedIds ) {
//         if(msg.author.id === ids ) return
//       }
//       msg.delete() 
//       const wordLen = words.length-2
//       msg.reply(`The word  is not allowed in this server`)
//       .then((msg) => {
//         msg.delete({ timeout: 10000 }) 
//       })//what is the timeout 4?
//     }//can u add the sasami and the boo?
// }
//     for( const words of args ) {
//         if (msg.content === words){
//           for (const ids of allowedIds ) {
//             if(msg.author.id === ids ) return
//           }
//           msg.delete() 
//           const wordLen = words.length-2
//           msg.reply(`The word  is not allowed in this server`)
//           .then((msg) => {
//             msg.delete({ timeout: 10000 }) 
//           })//what is the timeout 4?
//         }//can u ad
// }