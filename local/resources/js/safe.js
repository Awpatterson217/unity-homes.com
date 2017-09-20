"use strict";
const validator = require('validator');

const {sanitize}   = require('./sanitize');
const {passFormat} = require('./sanitize');

let safeEmail = function(email){
  let safeEmail = sanitize(email);
  if(validator.isEmail(safeEmail)){
    return safeEmail;
  }
  return false;
}

let safeCode = function(code){
  let safeCode = sanitize(code);
  if(validator.isNumeric(safeCode)){
    return safeCode;
  }
  return false;
}

let safePass = function(password){
  let safePass = sanitize(password);
  if(passFormat(safePass)){
    return safePass;
  }
  return false;
}

module.exports = {
  safeEmail: safeEmail,
  safeCode:  safeCode,
  safePass:  safePass
}
