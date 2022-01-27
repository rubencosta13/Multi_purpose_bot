const mongo = require('@utils/mongo')

module.exports = async function isCommandEnabled(schema, guildId) {
    await mongo()
    .then(async (mongoose) => {
        schema.findOne({guildId: guildId})
        .then(async (result) => {
            if (result === null){
                const provisoryData = await schema({
                    guildId: guildId,
                    enabled: false,
                })
                await provisoryData.save()
                return result.enabled
            }else{
                return result.enabled
            }
        })
        .catch(err => {
            console.log(err)
        })
    }) 
}