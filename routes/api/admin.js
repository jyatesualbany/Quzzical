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
    return results.status(400).json(errors);
  }
  const email = req.body.email;

  // query to find if email is in db
  const selectEmail = "select count(*) as emailCount from USER where email = '" + email + "'";
  db.query(selectEmail, (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack);
    }
    if(results[0].emailCount != 0){
      errors.email = 'Email already exists'
      return results.status(400).json(errors);
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
          //console.log('hello new user');
          return results.json({redirect: '/admindashboard'})
        }
      })
    }
  })
});

router.post('/getUsers', (req, result) => {
  const n = 'n'
  db.query("select * from USER where IS_ADMIN = '"+n+"'", (err, res) => {
    if(err) throw err
    // console.log(res);
    return result.json({users: res})
  })
})

router.post('/assginTest', (req, result) => {
  console.log('this is trying to get id: ' + req.body.test[0].USER_ID);
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
              temp=results[i][j]
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

          // console.log(question)
          db.query(insert, values, (err, res) => {
            if(err){
              return console.log(err.stack)
            }else{
              //console.log('test add')
            }
          })
        }
      })
  return res.json({status: 'good'})
});

router.post('/getQuestion', (req, results) => {
  db.query('select * from QUESTION', (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack)
    }
    // console.log(res[0].QUESTION_TEXT)
    return results.json({ques: res})
  })
});

router.post('/getTest', (req, results) => {
  db.query('SELECT TA.*, T.* FROM TEST_ASSIGNMENT TA\n' +
      'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID;', (err, res) => {
    if(err){
      console.error('Error connecting: ' + err.stack)
    }
    // console.log(res);

    return results.json({test: res})
  })
});


router.post('/getTestQuestion', (req, result) => {
  const select = 'SELECT Q.* FROM TEST_LIST TL\n'+
  'INNER JOIN QUESTION Q on TL.QUESTION_ID = Q.QUESTION_ID\n'+
  'WHERE TEST_ID = ?;'


  // console.log("this is req ses",req.session.userId, " ", req.body.params.testId)

  var values = [req.body.params.testId]
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
        // console.log(questionList[i].testTime)
      }
      //console.log("TESTLIST:" + testList)
      return result.json({
        questionList
      })
    }
  })
});

router.get('/test', (req, result) => {
  const select = 'SELECT UT.TEST_ID, T.TEST_DESCRIPTION, T.NAME, TA.TIME_LIMIT FROM USER_TEST UT\n' +
      'INNER JOIN TEST_ASSIGNMENT TA on UT.TEST_ID = TA.TEST_ID\n' +
      'INNER JOIN TEST T on TA.TEST_ID = T.TEST_ID;'
  
  //console.log("this is req ses",req.session.userId)
  
  res = db.query(select, (err, results, fields) => {
    let testList = []
    if(err){
        return console.error(err.stack);
    }else{
      var i = 0
      for(let i =0; i<results.length; i++){
        let test = {
          testId : results[i].TEST_ID,
          testDesc : results[i].TEST_DESCRIPTION,
          testName : results[i].NAME,
          timeLimit: results[i].TIME_LIMIT
        }
        testList.push(test)
      }
      return result.json({
        testList
      })  
      }
    })
  });

  // THE QUERY BELOW DOES NOT WORK YET. PLS FIX KOSTIN <3

  router.post('/getTest', (req, result) => {
    const select = 'SELECT Q.*, UT.FINISHED, T.TEST_DESCRIPTION, TA.TIME_LIMIT, T.NAME FROM USER_TEST UT\n'+
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
          // console.log(questionList[i].testTime)
        }
        //console.log("TESTLIST:" + testList)
        return result.json({
          questionList
        })
      }
    })
  });

  router.post('/getQuestions', (req, result) => {
    const select = 'SELECT * FROM QUESTION;'
    res = db.query(select, (err, results, fields) => {
      let questionList = []
      if(err){
        return console.error(err.stack);
      }else{
        var i = 0
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
  
          }
          questionList.push(question)
        }
        return result.json({
          questionList
        })
      }
    })
  });

 router.post('/deleteTest', (req, result) => {
    const test = req.body.test
    // console.log(test);
   //-----------------------------------------
   // DB stuff here KOSTIN <3
   db.query("delete from TEST where TEST_ID = '"+req.body.test.tID+"'", (err, res) => {
     if(err) throw err
     //console.log('it works');
     return result.json({output: 'good'})
    //console.log('does it hit');
   })
 });

 router.post('/deleteQuestion', (req, result) => {
   const question = req.body.question.qID
   //console.log(question);
    db.query("delete from QUESTION where QUESTION_ID = '"+question+"'", (err, res) => {
      if(err) throw err
      //('it works');
      return result.json({output: 'good'})
    }) 

 });

 router.post('/createTest', (req, result) => {
    // console.log(req.body.test) 
     
    //console.log(req.body);
    
    //-----------------------------------------
   // DB stuff here KOSTIN <3

  //  db.query(insert, values, (err, res) => {
  //    if(err){
  //      return console.log(err.stack)
  //    }else{
  //      console.log('test add')
  //    }
  //  })

 });

module.exports = router