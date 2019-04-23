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
  const object = []
  const output = {// this is a object for the output of the csv parse 
    quest: '',
    ans: [],
    correct: ''
  }
  const temp = req.file
  fs.createReadStream(temp.path).pipe(csv()).on('data', (data) => results.push(data))
    .on('end', () => {
      var k = 0;
      for(var i = 1; i < results.length; i++){
        output.quest = results[i][0]
        console.log(output.quest)
        for(var j = 0; j < results[i].length-1; j++){
          if(j === results[i].length-2){
            output.correct = results[i][j]
          }
          output.ans[j] = results[i][j]
        }
        object[k] = output
        console.log(object[k])
        k++
      }
      
      //----------------------------------------------------
      // DB stuff goes here

    })
    return res.json({status: 'good'})
})

router.get('/test', (req, result) => {
  const select = 'SELECT UT.TEST_ID, TA.TEST_DESCRIPTION, T.NAME, TA.TIME_LIMIT FROM USER_TEST UT\n' +
      'INNER JOIN TEST_ASSIGNMENT TA on UT.TEST_ID = TA.TEST_ID\n' +
      'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID;'
  
  console.log("this is req ses",req.session.userId)
  
  res = db.query(select, (err, results, fields) => {
    let testList = []
    if(err){
        return console.error(err.stack);
    }else{
      var i = 0
      //console.log("query results: " + results)
      //console.log("test id: " + results[0].TEST_ID)
      for(let i =0; i<results.length; i++){
        let test = {
          testId : results[i].TEST_ID,
          testDesc : results[i].TEST_DESCRIPTION,
          testName : results[i].NAME,
          timeLimit: results[i].TIME_LIMIT
        }
        testList.push(test)
      }
      //console.log("TESTLIST:" + testList)
      return result.json({
        testList
      })  
      }
    })
  })

  // THE QUERY BELOW DOES NOT WORK YET. PLS FIX KOSTIN <3

  router.post('/getTest', (req, result) => {
    const select = 'SELECT Q.*, UT.FINISHED, TA.TEST_DESCRIPTION, TA.TIME_LIMIT, T.NAME FROM USER_TEST UT\n'+
    'INNER JOIN TEST_ASSIGNMENT TA on UT.TEST_ID = TA.TEST_ID\n'+
    'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID\n'+
    'INNER JOIN TEST_LIST TL on T.TEST_ID = TL.TEST_ID\n' +
    'INNER JOIN QUESTION Q on TL.QUESTION_ID = Q.QUESTION_ID\n'+
    'UT.TEST_ID = ?;'
  
  
    //console.log("this is req ses",req.session.userId, " ", req.body.params.testId)
  
    res = db.query(select, req.body.params.testId, (err, results, fields) => {
      let questionList = []
      if(err){
        return console.error(err.stack);
      }else{
        var i = 0
        //console.log("query results: " + results)
        //console.log("test id: " + results[0].TEST_ID)
        for(let i =0; i<results.length; i++){
          let question = {
            questionId: results[i].QUESTION_ID,
            questionText: results[i].QUESTION_TEXT,
            answer1Text: results[i].ANSWER_ONE_TEXT,
            answer1: results[i].ANSWER_ONE,
            answer2Text: results[i].ANSWER_TWO_TEXT,
            answer2: results[i].ANSWER_TWO,
            answer3Text: results[i].ANSWER_THREE_TEXT,
            answer3: results[i].ANSWER_THREE,
            answer4Text: results[i].ANSWER_FOUR_TEXT,
            answer4: results[i].ANSWER_FOUR,
            answer5Text: results[i].ANSWER_FIVE_TEXT,
            answer5: results[i].ANSWER_FIVE,
            answer6Text: results[i].ANSWER_SIX_TEXT,
            answer6: results[i].ANSWER_SIX,
            isMult: results[i].IS_MULTIPLE,
            testTime: results[i].TIME_LIMIT,
            name: results[i].NAME
          }
          questionList.push(question)
          console.log(questionList[i].testTime)
        }
        //console.log("TESTLIST:" + testList)
        return result.json({
          questionList
        })
      }
    })
  })

module.exports = router