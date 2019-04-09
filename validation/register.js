const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateRegister(data) {
  let errors = {};
const n = data.name.toString()
  const e = data.email.toString()
  const p1 = data.password.toString()
  const  p2 = data.password2.toString()

  data.name = () => {
    if(!isEmpty(n)){ data.name = data.name; }
    else{ data.name = ''; }
  }

  data.email = () => {
    if(!isEmpty(e)){ data.email = data.email; }
    else{ data.email = ''; }
  }

  data.password = () => {
    if(!isEmpty(p1)) { data.password = data.password; }
    else { data.password = ''; }
  }

  data.password2 = () => {
    if(!isEmpty(p2)) { data.password2 = data.password2; }
    else { data.password2 = ''; }
  }

  if(!Validator.isLength(n, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if(Validator.isEmpty(n)){
    errors.name = 'Name field is needed'
  }

  if(Validator.isEmpty(e)){
    errors.email = 'Email field is needed';
  }

  if(!Validator.isEmail(e)){
    errors.email = 'Email is invalid'
  }

  if(Validator.isEmpty(p1)){
    errors.password = 'Password field is needed'
  }

  if(!Validator.isLength(p1, {min: 6, max: 30})){
    errors.password = 'Password must be at least 6 characters'
  }

  if(Validator.isEmpty(p2)){
    errors.password2 = 'Confirm Password field is needed'
  }

  if(!Validator.equals(p1, p2)){
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};
