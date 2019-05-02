const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('testing/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'testing', 'build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Server runing on port ${port}`))
