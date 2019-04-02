const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateRegister(data) {

  let errors = {};

  data.name = () => {
    if(!isEmpty(data.name)){ data.name = data.name; }
    else{ data.name = ''; }
  }

  data.email = () => {
    if(!isEmpty(data.email)){ data.email = data.email; }
    else{ data.email = ''; }
  }

  data.password = () => {
    if(!isEmpty(data.password)) { data.password = data.password; }
    else { data.password = ''; }
  }

  data.password2 = () => {
    if(!isEmpty(data.password2)) { data.password2 = data.password2; }
    else { data.password2 = ''; }
  }

  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field is needed'
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field is needed';
  }

  if(Validator.isEmail(data.email)){
    errors.email = 'Email is invalid'
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is needed'
  }

  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be at least 6 characters'
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Confirm Password field is needed'
  }

  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};
