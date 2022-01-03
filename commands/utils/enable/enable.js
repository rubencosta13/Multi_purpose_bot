const mongo = require('@utils/mongo')


module.exports = async function isCommandEnabled(schema, guildId) {
    await mongo()
    .then(async (mongoose) => {
        schema.findOne({_id: guildId})
        .then(result => {
            return result.enabled
        })
        .catch(err => {
            console.log(err)
        })
    }) 
}