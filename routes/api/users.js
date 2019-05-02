const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../config/database.js');

// Load Input Validation
const validateLogin = require('../../validation/login');
const db = connection.db
// Load User model

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, result) => {
  const select = 'SELECT UT.TEST_ID, UT.USER_TEST_ID, T.TEST_DESCRIPTION, T.NAME, TA.TIME_LIMIT FROM USER_TEST UT\n' +
      'INNER JOIN TEST_ASSIGNMENT TA on UT.TEST_ID = TA.TEST_ID\n' +
      'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID\n' +
      'WHERE UT.USER_ID=?'
  
  //("this is req ses",req.session.userId)
  
  var values = [req.session.userId]
  res = db.query(select, req.session.userId, (err, results, fields) => {
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
          usertestId : results[i].USER_TEST_ID,
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

// this make a post request to the db for the login
router.post('/login', (req, result) => {
  const {errors, isValid} = validateLogin(req.body);

  if(!isValid){
    //console.log(req.body.name)
    return res.status(666).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //console.log(email)
  var selectEmail = "select *from USER where email = '"+email+"'"
  // var selectEmail = "select *from USER where email = ?", email

  let db = connection.db
  db.query(selectEmail, function (err, res) {
    if(err){
      console.error('Error connecting: ' + err.stack);
    }
    if(res == null){
      return res.status(400).json(errors);
    }
    const pw = res[0].PASSWORD
    //console.log(pw);
    const user = {
      email: email,
      isAdmin: res[0].IS_ADMIN,
      password: req.password
    }
   

    if(pw == password){
      //console.log('logged in');
      //console.log(user.isAdmin)
      if(user.isAdmin == 'y'){
        //console.log(user.email)
        req.session.userId = res[0].USER_ID
        return result.json({redirect: '1'})
      }else{
        req.session.userId = res[0].USER_ID
        return result.json({redirect: '2'})
      }
    }
  })
})

router.post('/current', (req, result) => {
  const user = req.session.userId
  if(user == null){
    return result.json({bad: 'bad'})
  }
  var getUser = "select * from USER where USER_ID = '"+user+"'"
  db.query(getUser, (err, res) => {
    if(err) throw err
    return result.json({
      email: res[0].EMAIL,
      name: res[0].NAME,
      isAdmin: res[0].IS_ADMIN,
      userId: res[0].USER_ID
    })
  })
})

router.post('/getTest', (req, result) => {
  const select = 'SELECT Q.*, UT.FINISHED, T.TEST_DESCRIPTION, TA.TIME_LIMIT, T.NAME, UT.USER_TEST_ID FROM USER_TEST UT\n'+
  'INNER JOIN TEST_ASSIGNMENT TA on UT.TEST_ID = TA.TEST_ID\n'+
  'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID\n'+
  'INNER JOIN TEST_LIST TL on T.TEST_ID = TL.TEST_ID\n' +
  'INNER JOIN QUESTION Q on TL.QUESTION_ID = Q.QUESTION_ID\n'+
  'WHERE UT.USER_ID = ? AND UT.TEST_ID = ?;'


  //console.log("this is req ses",req.session.userId, " ", req.body.params.testId)

  var values = [req.session.userId, req.body.params.testId]
  res = db.query(select, values, (err, results, fields) => {
    let questionList = []
    if(err){
      return console.error(err.stack);
    }else{
      var i = 0
      //console.log("query results: " + results)
      //console.log("test id: " + results[0].TEST_ID)
      for(let i =0; i<results.length; i++){
        let question = {
          usertestId: results[i].USER_TEST_ID,
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
        //console.log(questionList[i].testTime)
      }
      //console.log("TESTLIST:" + testList)
      return result.json({
        questionList
      })
    }
  })
})

router.post('/updatePassword', (req, result) => {
  //console.log(req.body);
  const update = "UPDATE USER SET PASSWORD = '"+req.body.password+"'where NAME = '"+req.body.name+"'"
  db.query(update, (err, res) => {
    if(err) throw err
    return result.json({output: 'good'})
  })
})


router.post('/selectAnswer', (req, result) => {
  console.log(req.body);
  let update = 'UPDATE ANSWERS SET SELECTED = ? WHERE USER_TEST_ID = ? AND QUESTION_ID = ?;'
  let values = [req.body.pickedAnswer, req.body.utID, req.body.qID]
  db.query(update, values, (err, res) => {
    if(err) throw err
    return result.json({output: 'good'})
  })
})

router.post('/grade', (req, result) => {
    let g;
  let t;
  let tc;
  let total = 'SELECT COUNT(*) AS count FROM ANSWERS WHERE USER_TEST_ID = ?;'
  let totalCorrect = 'SELECT COUNT(*) AS correct FROM ANSWERS A\n' +
      'INNER JOIN QUESTION Q on A.QUESTION_ID = Q.QUESTION_ID\n' +
      'WHERE A.USER_TEST_ID = ? AND  A.SELECTED = Q.CORRECT;'

    db.query(total, req.body.usertestId,(err, res, fields) => {
      let questionList = []
      if(err){
        return console.error(err.stack);
      }else {
        console.log(res[0].count)
        t = res[0].count
        db.query(totalCorrect, req.body.usertestId, (err, res) => {
          if(err) {
            return console.error(err.stack);
          }
          else {
            tc = res[0].correct
            let grade = tc / t * 100;
            console.log(grade)
              g = grade
          }
        })
          return result.json({redirect: '/userdashboard' , grade: g})
      }
    })

})
module.exports = router;
