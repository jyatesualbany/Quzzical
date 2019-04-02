const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//

const validateLogin = require('../../validation/login');

//@route GET api/users/login
//@desc Login user/ Returning JWT Token
//@access Public

router.post('/login', (req, res) => {
  const {errors, isValid} = validateLogin(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //need to get info from database
})
