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
      // console.log(results[0][9])
      var question = {
        quest: null,
        ans1: null,
        A: null,
        ans2: null,
        B: null,
        ans3: null,
        C: null,
        ans4: null,
        D: null,
        ans5: null,
        E: null,
        ans6: null,
        F: null,
        correct: temp,
      }
      for (var i=0; i<results.length; i++){
        var an5 = null
        var e = null
        var an6 = null
        var f = null
        var temp= ''
        for (var j=0; j<results[0].length; j++) {
          if(results[i][j].charAt(0)=='*'){
            results[i][j] = results[i][j].charAt(1)
            temp=results[i][j-1]
            // console.log(results[i][j-1])
          }
          if(results[i][j] != null && j > 8){
           if(j == 9){an5 = results[i][9]; } 
           if(j == 10){e = results[i][10]; }
           if(j == 11){an6 = results[i][11]; }
           if(j == 12){f = results[i][12]; }
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
          ans5: an5,
          E: e,
          ans6: an6,
          F: f,
          correct: temp,
        }
        //----------------------------------------------------
        // DB stuff goes here
        const insert = 'insert into QUESTION(QUESTION_TEXT, ANSWER_ONE_TEXT, ANSWER_ONE, ANSWER_TWO_TEXT, ANSWER_TWO, ANSWER_THREE_TEXT, ANSWER_THREE, ANSWER_FOUR_TEXT, ANSWER_FOUR, ANSWER_FIVE_TEXT, ANSWER_FIVE, ANSWER_SIX_TEXT, ANSWER_SIX, CORRECT, IS_MULTIPLE) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        var values = [question.quest, question.ans1, question.A, 
                      question.ans2, question.B, question.ans3, 
                      question.C, question.ans4, question.D,
                      question.ans5, question.E, question.ans6, question.F, question.correct, 1]
        
        console.log(question)
        db.query(insert, values, (err, res) => {
          if(err){
            return console.log(err.stack)
          }else{
            console.log('test add')
          }
        })
      }
    })
    return res.json({status: 'good'})
})

router.post('/getQuestion', (req, results) => {
  db.query('select * from QUESTION', (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack)
    }
    console.log(res)
    return results.json({res})
  })
})

module.exports = router