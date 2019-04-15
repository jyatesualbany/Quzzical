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
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// this make a post request to the db for the login
router.post('/login', (req, result) => {
  const {errors, isValid} = validateLogin(req.body);

  if(!isValid){
    console.log(req.body.name)
    return res.status(666).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  var selectEmail = "select *from USER where email = '"+email+"'"
  // var selectEmail = "select *from USER where email = ?", email

  let db = connection.db
  db.query(selectEmail, function (err, res) {
    if(err){
      console.error('Error conecting: ' + err.stack);
    }
    if(res == null){
      return res.status(400).json(errors);
    }
    const pw = res[0].PASSWORD
    console.log(pw);
    const user = {
      email: req.email,
      isAdmin: res[0].IS_ADMIN,
      password: req.password
    }
   // bcrypt.compare(pw, req.body.password).then(isMatch => {
   //   if(isMatch){
   //       const payload = {email: user.email, isAdmin: user.isAdmin}
   //       jwt.sign(
   //         payload,
   //         'secret',
   //         {expiresIn: 3600},
   //         (err, tok) => {
   //           res.json({
   //             success: true,
   //             token: 'Bearer ' + tok
   //           })
   //         }
   //       )
   //   }else{
   //     errors.password = 'Password incorrect'
   //     return res.status(400).json(errors);
   //   }
   // })
    // bcrypt.compare(pw, req.body.password, (err, isMatch) => {
    //   if(err) throw err
    //   if(isMatch){
    //     console.log('logged in');
    //     const payload = { email: user.email, isAdmin: user.isAdmin }
    //     var token = jwt.encode(payload, 'secret')
    //     return res.json({
    //       success: true,
    //       token: `JWT ${token}`,
    //     });
    //   }


    // })

    if(pw == password){
      console.log('logged in');
      console.log(user.isAdmin)
      if(user.isAdmin == 'y'){
        console.log(user.email)
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
  console.log(user)
  var getUser = "select * from USER where USER_ID = '"+user+"'"
  db.query(getUser, (err, res) => {
    if(err) throw err
    return result.json({
      email: res[0].EMAIL,
      name: res[0].NAME,
      isAdmin: res[0].IS_ADMIN
    })
  })
})

/*router.post('/getTest', (req, result) => {
  const user = req.session.userId
  console.log(user)
  var getUser = "select * from USER where USER_ID = '"+user+"'"
  db.query(getUser, (err, res) => {
    if(err) throw err
    return result.json({
      email: res[0].EMAIL,
      name: res[0].NAME,
      isAdmin: res[0].IS_ADMIN
    })
  })
})*/

module.exports = router;
