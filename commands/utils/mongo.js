require('dotenv').config()
const mongoose = require("mongoose")


module.exports = async () => {
    mongoose.connect(process.env.MongoURL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            connectTimeoutMS: 30000,
        }
    )
    .then(result => {
        return mongoose
    })
    .catch(err => {
        console.log(err)
    })
    return mongoose
}
