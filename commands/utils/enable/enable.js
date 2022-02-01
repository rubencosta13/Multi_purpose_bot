const mongo = require('@utils/mongo')

module.exports = async function isCommandEnabled(schema, guildId) {
    await mongo()
    .then(async (mongoose) => {
        schema.findOne({guildId: guildId})
        .then(async (result) => {
            console.log(result)
            if (result.enabled === false) return false
            return true
        })
        .catch(err => {
            console.log(err)
        })
    }) 
}