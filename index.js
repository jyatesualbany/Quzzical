


const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
//const connection = require('./config/database.js');
const connection = require('./config/database.js');
const users = require('./routes/api/users.js');
//import axios from 'axios';
const app = express();
const db = connection.db

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// const connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'username',
//  password: 'password',
//  database: 'db name'
// })
//
// connection.connect()

app.use(passport.initialize())

//make query
// database.connection.query('select * from USER', function (err, rows, fields) {
// //  if (err){
// //    console.error('Error connecting: ' + err.stack);
// //  }
// //
// //  do stuff if valid
// // })

app.use('/api/users', users)

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server running on port ' + port))
//kill connection
db.end()


