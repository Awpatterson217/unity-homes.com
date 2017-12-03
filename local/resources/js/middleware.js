"use strict";

const validator = require('validator');

const {sanitize}     = require('./safe');
const {isPassFormat} = require('./safe');
const {safeBool}     = require('./safe');
const {safeStr}      = require('./safe');
const {safeNum}      = require('./safe');

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

let checkPhone = function(req, res, next){
  let phone = sanitize(req.body.phone);
  if(validator.isNumeric(phone)){
    req.body.phone = phone;
    return next();
  }
  req.body.phone = '';
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

let checkImage = function(req, res, next){
  let image = sanitize(req.body.image);
  if(validator.isDataURI(image)){
    req.body.image = image;
    return next();
  }
  req.body.image = '';
  return next();
}

let checkProps = function(req, res, next){
  let property = {};

  property.mainImage = safeStr(req.body.mainImage);
  property.street    = safeStr(req.body.street);
  property.city      = safeStr(req.body.city);
  property.zip       = safeNum(req.body.zip);
  property.state     = safeStr(req.body.state);
  property.type      = safeStr(req.body.type);
  property.sqft      = safeNum(req.body.sqft);
  property.washer    = safeBool(req.body.washer);
  property.dryer     = safeBool(req.body.dryer);
  property.garage    = safeBool(req.body.garage);
  property.basement  = safeBool(req.body.basement);
  property.fence     = safeBool(req.body.fence);
  property.stories   = safeNum(req.body.stories);
  property.occupied  = safeBool(req.body.occupied);

  for(let prop in property){
    if(property.hasOwnProperty(prop)){
      req.body[prop] = property[prop].val;
    }
  }

  return next();
}

let checkPropId = function(req, res, next){
  let id = sanitize(req.body.id);
  req.body.id = id;
  return next();
}

let checkAuth = function(req, res, next){
  if(!req.session.userAuth){
    let responseText = '<h1>No Access!</h1>';
    responseText += '<form action=\'/login\'>';
    responseText += '<hr>';
    responseText += '<br /> You may need to <input type=\'submit\' value=\'login again.\' autofocus/>';
    responseText += '</form>';
    return res.send(responseText);
  }else{
    return next();
  }
}

module.exports = {
  checkEmail  : checkEmail,
  checkPhone  : checkPhone,
  checkNames  : checkNames,
  checkCode   : checkCode,
  checkPass   : checkPass,
  checkPassTwo: checkPassTwo,
  checkProps  : checkProps,
  checkPropId : checkPropId,
  checkAuth   : checkAuth,
  checkImage  : checkImage
}
