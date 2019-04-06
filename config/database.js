const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'quizzical.chkqldbkslgu.us-east-2.rds.amazonaws.com',
  user: 'QUIZZICAL',
  password: 'QUIZZICAL418y',
  database: 'QUIZZICAL',
  port: 3306,
  acquireTimeout: 1000000
});

connection.connect(function (err) {
  if(err) throw err;
  console.log('Connected to the database');
})

module.exports = {
  db : connection
}

