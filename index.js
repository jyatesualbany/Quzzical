const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users.js');

const app = express();

app.use(bodyParser.urlencoded({extened: false}))
app.use(bodyParser.json())

//const connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'username',
//  password: 'password',
//  database: 'db name'
//})

//connection.connect()

//app.use(passport.initialize())

// make query
//connection.query('', function (err, rows, fields) {
//  if (err){
//    console.error('Error conecting: ' + err.stack);
//  }
//
//  //do stuff if valid
//})

//app.use('/api/users', users)

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server runing on port ' + port))
//kill connection
//connection.end()
