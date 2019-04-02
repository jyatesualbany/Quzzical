const Validator = require('validator');
const isEmpty = require('./isEmpty.js');
// isEmpty is needed because the default isEmpty fn returns a string but we use a object

module.exports = function validateLogin(data) {
  let errors = {}

  data.email = function () {
    if(!isEmpty(data.email)){
      data.email = data.email
    }else{
      data.email = ''
    }
  }

  //data.email = !isEmpty(data.email) ? data.email : '';
  data.password = () => {
    if (!isEmpty(data.password)) { data.password = data.password; }
    else{ data.password = '';}
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is not valid'
  }

  if(Validator.isEmpty(data.email)){
    errors.password = 'Password is needed'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
