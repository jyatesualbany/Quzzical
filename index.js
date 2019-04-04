const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
//const connection = require('./config/database.js');

const users = require('./routes/api/users.js');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// this commented code was for testing the connect to the db along with the querys needed for login/register

//const connection = mysql.createConnection({
//  host: 'quizzical.chkqldbkslgu.us-east-2.rds.amazonaws.com',
//  user: 'QUIZZICAL',
//  password: 'QUIZZICAL418y',
//  database: 'QUIZZICAL',
//  port: 3306,
//  acquireTimeout: 1000000
//})
//
//connection.connect(function (err) {
//  if(err) throw err;
//  console.log("Connected!");
//})
//
//app.use(bodyParser.json)
//
//// make queryp
//var email = "kgalusha@albany.edu"
//var selectEmail = "select count(*) as emailCount from USER where EMAIL=  "
//connection.query(selectEmail +"'"+email+"'" , function (err, result, fields) {
//  if (err){
//    console.error('Error conecting: ' + err.stack);
//  }
//
//  //if (result[0].PASSWORD == "helloworld") {
//  // console.log('you are login');
//  //}else{
//  //  console.log('login failed');
//  //}
//  console.log(result[0].emailCount);
//
//  //do stuff if valid
//})

//app.use(passport.initialize())
app.use('/api/users', users)
//app.use('/api/users', users)

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server runing on port ' + port))
//kill connection
//connection.end()
