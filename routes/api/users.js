const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = require('../../config/database.js');
const validateLogin = require('../../validation/login');

//@route GET api/users/login
//@desc Login user/ Returning JWT Token
//@access Public

router.post('/login', (req, res) => {
  const {errors, isValid} = validateLogin(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  let db = connection.db
  var selectEmail = "select exists(select * from USERS where email = '"+email+"')"
  db.query(selectEmail, function (err, res) {
    if(err){
      console.error('Error conecting: ' + err.stack);
    }
    var row = JSON.stringify(res)
    var arr = JSON.parse(row)
    var pass = JSON.stringify(arr[0].PASSWORD).toString()
    var len = pass.length
    var p = pass.substring(1, len-1)

    if(p == password){
      jwt.sign(

      )
    }

  })
  //need to get info from database
})

module.exports = router
