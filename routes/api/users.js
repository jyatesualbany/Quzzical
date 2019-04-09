const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../config/database.js');

// Load Input Validation
const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');
const db = connection.db
// Load User model

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/register', (req, res) => {
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
    // if(rows[0].emailCount !== 0){
    //   errors.email = 'Email already exists'
    //   return res.status(400).json(errors);
    // }
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
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.PASSWORD, salt, (err, hash) => {
          if(err) throw err
          newUser.PASSWORD = hash
          var values = [newUser.NAME, newUser.IS_ADMIN, newUser.EMAIL, newUser.PASSWORD]


          db.query(insert, values, (err, res) => {
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
      if(user.isAdmin == 'y'){
        return result.json({redirect: '/admindashboard'})
      }else{
        return result.json({redirect: '/userdashboard'})
      }
    }
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
