


const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users.js');
// const profile = require('./routes/api/profile.js');
// const posts = require('./routes/api/posts.js');

const app = express();


// Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//use routes
app.use('/api/users', users)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port ${port}`))
