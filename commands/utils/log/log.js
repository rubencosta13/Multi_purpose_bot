const config = require('../../../config.json')
module.exports = async function(dataToBeLogged){
    const isLoggingEnabled = config.log
    if (!dataToBeLogged) return 
    if (!isLoggingEnabled) return
    console.log(dataToBeLogged)

    
}

// Nice
//i got animal ideas!
//ill go get more