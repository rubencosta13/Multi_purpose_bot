const express = require('express')
require('dotenv').config()
const app = express()
const PORT = 3000
const path = require('path');
const session = require('express-session')
const passport = require('passport')
const discordStrategy = require('./strategies/discordStrategy')
const database = require('./database/database')
database.then(() => console.log('Connected to MongoDB')).catch((error) => console.log('error'+error))
//? ROUTES
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'NoOneKnowsThis',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize())
app.use(passport.session())

//? MIDDLEWARE
app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)


app.listen(PORT, () => {
    console.log('Listening on port ' +PORT)
})