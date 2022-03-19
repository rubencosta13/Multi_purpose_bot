require('dotenv').config()
const mongoose = require("mongoose")
const isLogging = require('./log/log')

module.exports = async () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(process.env.MongoURL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            connectTimeoutMS: 30000,
        }
    )
    .then(result => {
        isLogging(result)
        return mongoose
    })
    .catch(err => {
        console.log(`Error: \n ${err}`)
    })
    return mongoose
}
