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
  checkCode   : checkCode,
  checkPass   : checkPass,
  checkPassTwo: checkPassTwo,
}
