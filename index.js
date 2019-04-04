const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
//const connection = require('./config/database.js');

const users = require('./routes/api/users.js');

const app = express();

app.use(bodyParser.urlencoded({extened: false}))
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: 'quizzical.chkqldbkslgu.us-east-2.rds.amazonaws.com',
  user: 'QUIZZICAL',
  password: 'QUIZZICAL418y',
  database: 'QUIZZICAL',
  port: 3306,
  acquireTimeout: 1000000
})

connection.connect(function (err) {
  if(err) throw err;
  console.log("Connected!");
})

app.use(bodyParser.json)

// make query
connection.query('SELECT * FROM USER', function (err, result, fields) {
  if (err){
    console.error('Error conecting: ' + err.stack);
  }
  var row = JSON.stringify(result)
  var arr = JSON.parse(row)
  var pass = JSON.stringify(arr[0].PASSWORD).toString()
  var len = pass.length
  var p = pass.substring(1, len-1)
  console.log(p);

  if (p == "helloworld") {
   console.log('you are login');
  }else{
    console.log('login failed');
  }
  console.log(p);
  //do stuff if valid
})

//app.use(passport.initialize())
app.use('/api/users', users)
//app.use('/api/users', users)

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server runing on port ' + port))
//kill connection
//connection.end()
