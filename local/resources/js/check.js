"use strict";

const validator = require('validator');

const {sanitize}     = require('./sanitize');
const {isPassFormat} = require('./sanitize');

let checkEmail = function(req, res, next){
  let email = sanitize(req.body.email);
  if(validator.isEmail(email)){
    req.body.email = email;
    return next();
  }
  req.body.email = '';
  return next();
}

let checkNames = function(req, res, next){
  let firstName  = sanitize(req.body.firstName);
  let middleName = sanitize(req.body.middleName);
  let lastName   = sanitize(req.body.lastName);

  if(firstName.length < 20)
    req.body.firstName = firstName;
  else
    req.body.firstName = '';

  if(middleName.length < 20)
    req.body.middleName = middleName;
  else
    req.body.middleName = '';

  if(lastName.length < 20)
    req.body.lastName = lastName;
  else
    req.body.lastName = '';

  return next();
}

let checkCode = function(req, res, next){
  let code = sanitize(req.body.code);
  if(validator.isNumeric(code)){
    req.body.code = code;
    return next();
  }
  req.body.code = '';
  return next();
}

let checkPass = function(req, res, next){
  let pass = sanitize(req.body.password);
  if(isPassFormat(pass)){
    req.body.password = pass;
    return next();
  }
  req.body.password = '';
  return next();
}

let checkPassTwo = function(req, res, next){
  let pass = sanitize(req.body.passwordTwo);
  if(isPassFormat(pass)){
    req.body.passwordTwo = pass;
    return next();
  }
  req.body.passwordTwo = '';
  return next();
}

module.exports = {
  checkEmail  : checkEmail,
  checkNames  : checkNames,
  checkCode   : checkCode,
  checkPass   : checkPass,
  checkPassTwo: checkPassTwo,
}
