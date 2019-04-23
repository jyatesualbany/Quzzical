const express = require('express');
const router = express.Router();
const connection = require('../../config/database.js');
const validateRegister = require('../../validation/register');
const csv = require('csv-parse')
const fs = require('fs')
const multer = require('multer')
const db = connection.db

const input = multer({dest: 'uploads/'})

router.post('/register', (req, results) => {
  const { errors, isValid } = validateRegister(req.body)

  if(!isValid){
     return res.status(400).json(errors);
  }
  const email = req.body.email;

  // query to find if email is in db
  const selectEmail = "select count(*) as emailCount from USER where email = '" + email + "'";
  db.query(selectEmail, (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack);
    }
    if(res[0].emailCount != 0){
      errors.email = 'Email already exists'
      return res.status(400).json(errors);
    }
    else{
      // create new user
      const newUser = ({
        NAME: req.body.name,
        EMAIL: req.body.email,
        PASSWORD: req.body.password,
        IS_ADMIN: req.body.isAdmin
      })

      //insert new user to db
      const insert = "insert into USER(NAME, IS_ADMIN, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)"
          var values = [newUser.NAME, newUser.IS_ADMIN, newUser.EMAIL, newUser.PASSWORD]

          db.query(insert, values, (err, res) => {
            if(err){
              return console.error(err.stack);
            }else{
              console.log('hello new user');
              return results.json({redirect: '/admindashboard'})
            }
          })
    }
  })
})

router.post('/upload', input.single('file'), (req, res) => {
  const results = []
  const output = {// this is a object for the output of the csv parse 
    quest: '',
    ans: [],
    correct: ''
  }
  const temp = req.file
  fs.createReadStream(temp.path).pipe(csv()).on('data', (data) => results.push(data))
    .on('end', () => {
      output.quest = results[1][0]
      var j = 0;
      for(var i = 1; i < results[1].length-1; i++){
        // console.log(results[1][i])
        output.ans[j] = results[1][i]
        j++
      }
      output.correct = results[1][results[1].length-1] 
      
      //----------------------------------------------------
      // DB stuff goes here

    })
    return res.json({status: 'good'})
})

module.exports = router