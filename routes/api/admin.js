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
  const temp = req.file
  fs.createReadStream(temp.path).pipe(csv()).on('data', (data) => results.push(data))
    .on('end', () => {
      //use results[i]
      var question = {}
      for (var i=0; i<results.length; i++){
        var temp= ''
        for (var j=0; j<results[0].length; j++) {
          if(results[i][j].charAt(0)=='*'){
            temp=results[i][j-1]
            console.log(results[i][j-1])
            //or change to results[i][j] if you want to store A_ instead
          }
        }
        question = {
          quest: results[i][0],
          ans1: results[i][1],
          A: results[i][2],
          ans2: results[i][3],
          B: results[i][4],
          ans3: results[i][5],
          C: results[i][6],
          ans4:results[i][7],
          D: results[i][8],
          correct: temp,
        }
        //----------------------------------------------------
        // DB stuff goes here
        console.log(question)
      }
    })
    return res.json({status: 'good'})
})

module.exports = router