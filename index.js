const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')

const users = require('./routes/api/users.js');
const admins = require('./routes/api/admin.js');
const app = express();


// Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'secret',
    resave: false,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 * 60),
        sameSite: true
    }
}))
module.exports.session = session
//use routes
app.use('/api/users', users)
app.use('/api/admin', admins)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port ${port}`))
