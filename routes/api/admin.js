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
  // const input = [{
  //   text: '',
  //   ans: ''
  // }]
  // // this is a object for the output of the csv parse 
  // const output = {
  //   quest: [],
  //   ans: [input],
  //   correct: []
  // }

  const output = {
    quest: '',
    ans: []
  }
  const arrofOutput = [output]

  const temp = req.file
  fs.createReadStream(temp.path).pipe(csv()).on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results)
      //use results[i]
      for (var i=0; i<results.length; i++){
        //results[i]=1 question
        //console.log(results[i])
        var temp= ''
        for (var j=0; j<results[0].length; j++) {
          //console.log(results[i][j])
          if(results[i][j].charAt(0)=='*'){
            temp=results[i][j-1]
            console.log(results[i][j-1])
          }
        }
        //ar parts= results[i].split(",")
        const question = {
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
      }

      //var question = JSON.parse('{"Question":results[0],"A":results[1],"Ans1":results[2],}');

      // for(var i = 0; i < results.length; i++){
      //   results[i].forEach(x => {
          
      //     console.log(x)
      //   })
      // }

      // this parses the file into a array of objects and the answers for each question is seperated by '**'
      // for(var i = 0; i < results.length; i++){
      //   output.quest[i] = results[i][0]
      //   for(var j = 1; j < results[i].length-1; j++){
      //     output.ans.push([{text: results[i][j], ans: results[i][j+1]}])
      //     j++
      //   }
      //   output.correct.push(results[i][results[i].length-1])
      //   output.ans.push('**')
      // }

      // this gets the answer for the first question
      // var b = true
      // for(var i = 1; i < output.ans.length; i++){
      //   for(var j = 0; j < output.ans[i].length; j++){
      //     if(output.ans[i] != '**'){
      //       if(output.ans[i][j].ans == output.correct[0]){
      //         console.log(output.ans[i][j].ans + ":" + output.ans[i][j].text)
      //         b = false
      //         break
      //       }
      //     }
      //   }
      //   if(!b) {break;}
      // }
      //----------------------------------------------------
      // DB stuff goes here

    })
    return res.json({status: 'good'})
})

module.exports = router