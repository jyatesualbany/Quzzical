

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

  if(!isValid){
     return res.status(400).json(errors);
  }


  const email = req.body.email;
  const password = req.body.password;

  // query to find if email is in db
  var selectEmail = "select count(*) as emailCount from USER where email = '"+email+"'"
  db.query(selectEmail, (err, res) => {
    if(err){
      console.error('Error conecting: ' + err.stack);
    }
    if(res[0].emailCount != 0){
      errors.email = 'Email already exists'
      return res.status(400).json(errors);

    }else{
      // create new user
      const newUser = ({
        name: req.body.name,

        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.admin

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


  var selectEmail = "select *from USER where email = '"+email+"'"


  let db = connection.db
//   var selectEmail = "select exists(select * from USERS where email = '"+email+"')"

  db.query(selectEmail, function (err, res) {
    if(err){
      console.error('Error conecting: ' + err.stack);
   
    const pw = res[0].PASSWORD
    bcrypt.compare(pw, user.password).then(isMatch => {
      if(isMatch){

        const payload = {email: user.email, isAdmin: user.isAdmin}
        jwt.sign(
            payload,
            'secret',
            {expiresIn: 3600},
            (err, tok) => {
              res.json({
                success: true,
                token: 'Bearer ' + tok
              })
            }
        )
      }else{
        errors.password = 'Password incorrect'
        return res.status(400).json(errors);
      }
    })


  })
  //need to get info from database
})

module.exports = router
