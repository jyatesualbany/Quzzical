const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../config/database.js');
const localStorage = require('localStorage')

// Load Input Validation
const validateLogin = require('../../validation/login');
const db = connection.db
// Load User model

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// this make a post request to the db for the login
router.post('/login', (req, result) => {
  const {errors, isValid} = validateLogin(req.body);

  if(!isValid){
    return res.status(666).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  var selectEmail = "select *from USER where email = '"+email+"'"
  // var selectEmail = "select *from USER where email = ?", email

  db.query(selectEmail, function (err, res) {
    if(err){
      console.error('Error conecting: ' + err.stack);
    }
    if(res == null){
      return res.status(400).json(errors);
    }
    const pw = res[0].PASSWORD
    // console.log(pw);
    const user = {
      email: req.email,
      isAdmin: res[0].IS_ADMIN,
      password: req.password
    }

    if(pw == password){
      console.log('logged in');

      console.log(user.isAdmin)
      if(user.isAdmin === 'y'){
        console.log('hi')
        return result.json({redirect: '1'})
      }else{
        const token = {
          id: res[0].USER_ID
        }
        localStorage.setItem('user', token)
        return result.json({redirect: '2'} )
      }
    }
  })
})

router.post('/current', (req, result) => {
  const user = localStorage.getItem('user')
  console.log(user.id)
  var getUser = "select * from USER where USER_ID = '"+user.id+"'"
  db.query(getUser, (err, res) => {
    if(err) throw err
    console.log(res[0].email)
    return result.json({
      email: res[0].EMAIL,
      name: res[0].NAME
    })
  })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

module.exports = router;
