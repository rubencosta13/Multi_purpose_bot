const mongo = require('@utils/mongo')

module.exports = async function isCommandEnabled(schema, guildId) {
    console.log(`Testing`)
    await mongo()
    .then(async (mongoose) => {
        schema.findOne({guildId: guildId})
        .then(async (result) => {
            console.log(result)
            if (result === null){
                const provisoryData = await schema({
                    _id: mongoose.Types.ObjectId(),
                    guildId: guildId,
                    enabled: false,
                })
                await provisoryData.save()
                console.log(result)
                if (result.enabled === false)return false
                return true
            }else{
                console.log(result)
                if (result.enabled === false)return false
                return true
            }
        })
        .catch(err => {
            console.log(err)
        })
    }) 
}