const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = require('../../config/database.js');
const validateLogin = require('../../validation/login');

const validateRegister = require('../../validation/register');
const db = connection.db

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body)

  if(!isValid){
     return res.status(400).json(errors);
  }


  const email = req.body.email;
  const password = req.body.password;

  // query to find if email is in db
  var selectEmail = "select count(*) as emailCount from USER where email = '"+email+"'"
  db.query(selectEmail, (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack);
    }
    if(res[0].emailCount !== 0){
     errors.email = 'Email already exists'
     return res.status(400).json(errors);
    }else{
      // create new user
      const newUser = ({
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password: req.body.password
      })

      //insert new user to db
      const insert = "insert into USER(NAME,IS_ADMIN, EMAIL, PASSWORD) VALUES ?"
      bcrypt.getSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err
          newUser.password = hash
          db.query(insert, newUser, (err, res) => {
            if(err){
              return console.error(err.stack);
            }else{
              console.log('hello new user');
            }
          })
        })
      })
    }
  })


})



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
