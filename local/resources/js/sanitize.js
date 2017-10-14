"use strict";

const validator = require('validator');
const safe      = require('safe-regex');

const passExpl = /(?=.*[a-z])/;
const passExpL = /(?=.*[A-Z])/;
const passExpn = /(?=.*[0-9])/;

let sanitize = function (input) {
  let response;
  let trimmed;
  if(typeof input === 'string'){
    trimmed = validator.trim(input);
    if(!validator.isEmpty(trimmed)){
      return response = validator.escape(trimmed);
    }
  }
  return '';
};

let isPassFormat = function(password){
  if(!password)
    return false;
  // Is password 8-20 characters
  if(!(validator.isLength(password, {min: 8, max: 20})))
    return false;
  // Make sure regular expressions
  // are not susceptible to DOS attack
  if(!safe(passExpl))
    return false;
  if(!safe(passExpL))
    return false;
  if(!safe(passExpn))
    return false;
  // Does password have:
  // 1 uppercase
  // 1 lowercase
  // 1 number
  if(!(validator.matches(password, passExpl)))
    return false;
  if(!(validator.matches(password, passExpL)))
    return false;
  if(!(validator.matches(password, passExpn)))
    return false;
  return true;
}

let notEmpty = function(str){
  if(str === '')
    return false;
  return true;
}

module.exports = {
  sanitize    : sanitize,
  isPassFormat: isPassFormat,
  notEmpty    : notEmpty
}
