"use strict";

const validator = require('validator');

const {sanitize}     = require('./safe');
const {isPassFormat} = require('./safe');
const {safeBool}     = require('./safe');
const {safeStr}      = require('./safe');
const {safeNum}      = require('./safe');

let checkEmail = function (req, res, next) {
  let email = sanitize(req.body.email);
  if (validator.isEmail(email)) {
    req.body.email = email;
    return next();
  }
  req.body.email = '';
  return next();
}

let checkNames = function (req, res, next) {
  let firstName  = sanitize(req.body.firstName);
  let middleName = sanitize(req.body.middleName);
  let lastName   = sanitize(req.body.lastName);

  if (firstName.length < 20)
    req.body.firstName = firstName;
  else
    req.body.firstName = '';

  if (middleName.length < 20)
    req.body.middleName = middleName;
  else
    req.body.middleName = '';

  if (lastName.length < 20)
    req.body.lastName = lastName;
  else
    req.body.lastName = '';

  return next();
}

let checkCode = function (req, res, next) {
  let code = sanitize(req.body.code);
  if (validator.isNumeric(code)) {
    req.body.code = code;
    return next();
  }
  req.body.code = '';
  return next();
}

let checkPhone = function (req, res, next) {
  let phone = sanitize(req.body.phone);
  if (validator.isNumeric(phone)) {
    req.body.phone = phone;
    return next();
  }
  req.body.phone = '';
  return next();
}

let checkPass = function (req, res, next) {
  let pass = sanitize(req.body.password);
  if (isPassFormat(pass)) {
    req.body.password = pass;
    return next();
  }
  req.body.password = '';
  return next();
}

let checkPassTwo = function (req, res, next) {
  let pass = sanitize(req.body.passwordTwo);
  if (isPassFormat(pass)) {
    req.body.passwordTwo = pass;
    return next();
  }
  req.body.passwordTwo = '';
  return next();
}

let checkImage = function (req, res, next) {
  let image = sanitize(req.body.image);
  if (validator.isDataURI(image)) {
    req.body.image = image;
    return next();
  }
  req.body.image = '';
  return next();
}

let checkProps = function (req, res, next) {
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

  for (let prop in property) {
    if (property.hasOwnProperty(prop)) {
      req.body[prop] = property[prop].val;
    }
  }

  return next();
}

let checkId = function (req, res, next) {
  let id = sanitize(req.body.id);
  req.body.id = id;
  return next();
}

let checkAdminAuth = function (req, res, next) {
  if (!req.session.userAuth)
    return res.redirect('/login');
  if (req.session.type !== 'admin')
    return res.redirect('/login');
  return next();
}

let checkAuth = function (req, res, next) {
  if (!req.session.userAuth)
    return res.redirect('/login');
  return next();
}

let checkTenantAuth = function (req, res, next) {
  if (!req.session.userAuth)
    return res.redirect('/login');
  if (req.session.type !== 'tenant')
    return res.redirect('/login');
  return next();
}

let checkApp = function (req, res, next) {
  let app = {};

  // Personal / Current
  app.email      = safeEmail(req.body.email);
  app.phone      = safeNum(req.body.phone);
  app.firstName  = safeStr(req.body.firstName);
  app.middleName = safeStr(req.body.middleName);
  app.lastName   = safeStr(req.body.lastName);
  app.dob        = safeNum(req.body.dob);
  app.ssn        = safeNum(req.body.ssn);
  app.street     = safeStr(req.body.street);
  app.city       = safeStr(req.body.city);
  app.state      = safeStr(req.body.state);
  app.zip        = safeNum(req.body.zip);
  app.timeLived  = safeNum(req.body.timeLived);
  app.landlordFName = safeStr(req.body.landlordFName);
  app.landlordLName = safeStr(req.body.landlordLName);
  app.landlordPhone = safeNum(req.body.landlordPhone);

  // Past Address
  app.previousStreet     = safeStr(req.body.previousStreet);
  app.previousCity       = safeStr(req.body.previousCity);
  app.previousState      = safeStr(req.body.previousState);
  app.previousZip        = safeNum(req.body.previousZip);
  app.previousTimeLived  = safeNum(req.body.previousTimeLived);
  app.previousLandlordFirstName = safeStr(req.body.landlordFName);
  app.previousLandlordLName     = safeStr(req.body.landlordLName);
  app.previousLandlordPhone     = safeNum(req.body.previousLandlordPhone);

  app.monthlyIncome = safeNum(req.body.monthlyIncome);

  // Current Emp
  app.employer        = safeStr(req.body.employer);
  app.employerPhone   = safeNum(req.body.employerPhone);
  app.employerStreet  = safeStr(req.body.employerStreet);
  app.employerCity    = safeStr(req.body.employerCity);
  app.employerState   = safeStr(req.body.employerState);
  app.employerZip     = safeNum(req.body.employerZip);
  app.position        = safeNum(req.body.position);
  app.timeWorked      = safeNum(req.body.timeWorked);
  app.supervisorFName = safeStr(req.body.supervisorFName);
  app.supervisorLName = safeStr(req.body.supervisorLName);

  // Previous Emp
  app.previousEmployer        = safeStr(req.body.previousEmployer);
  app.previousEmployerPhone   = safeNum(req.body.previousEmployerPhone);
  app.previousEmployerStreet  = safeStr(req.body.previousEmployerStreet);
  app.previousEmployerCity    = safeStr(req.body.previousEmployerCity);
  app.previousEmployerState   = safeStr(req.body.previousEmployerState);
  app.previousEmployerZip     = safeNum(req.body.previousEmployerZip);
  app.previousPosition        = safeNum(req.body.previousPosition);
  app.previousTimeWorked      = safeNum(req.body.previousTimeWorked);
  app.previousSupervisorFName = safeStr(req.body.previousSupervisorFName);
  app.previousSupervisorLName = safeStr(req.body.previousSupervisorLName);

  // Roommates
  app.firstRoommateFName = safeStr(req.body.firstRoommateFName);
  app.firstRoommateLName = safeStr(req.body.firstRoommateLName);
  app.firstRelationship  = safeStr(req.body.firstRelationship);

  app.secondRoommateFName = safeStr(req.body.secondRoommateFName);
  app.secondRoommateLName = safeStr(req.body.secondRoommateLName);
  app.secondRelationship  = safeStr(req.body.secondRelationship);

  app.thirdRoommateFName = safeStr(req.body.thirdRoommateFName);
  app.thirdRoommateLName = safeStr(req.body.thirdRoommateLName);
  app.thirdRelationship  = safeStr(req.body.thirdRelationship);

  app.fourthRoommateFName = safeStr(req.body.fourthRoommateFName);
  app.fourthRoommateLName = safeStr(req.body.fourthRoommateLName);
  app.fourthRelationship  = safeStr(req.body.fourthRelationship);

  // Pets
  app.firstPetName   = safeStr(req.body.firstPetName);
  app.firstPetGender = safeStr(req.body.firstPetGender);
  app.firstPetBreed  = safeStr(req.body.firstPetBreed);
  app.firstPetWeight = safeNum(req.body.firstPetWeight);
  app.firstPetAge    = safeNum(req.body.firstPetAge);
  app.firstPetSpayed = safeBool(req.body.firstPetSpayed);

  app.secondPetName   = safeStr(req.body.secondPetName);
  app.secondPetGender = safeStr(req.body.secondPetGender);
  app.secondPetBreed  = safeStr(req.body.secondPetBreed);
  app.secondPetWeight = safeNum(req.body.secondPetWeight);
  app.secondPetAge    = safeNum(req.body.secondPetAge);
  app.secondPetSpayed = safeBool(req.body.secondPetSpayed);

  // References
  app.firstReferenceFName = safeStr(req.body.firstReferenceFName);
  app.firstReferenceLName = safeStr(req.body.firstReferenceLName);
  app.firstReferenceRel   = safeStr(req.body.firstReferenceRel); 
  app.firstReferenceYears = safeNum(req.body.firstReferenceYears);
  app.firstReferencePhone = safeNum(req.body.firstReferencePhone);

  app.secondReferenceFName = safeStr(req.body.secondReferenceFName);
  app.secondReferenceLName = safeStr(req.body.secondReferenceLName);
  app.secondReferenceRel   = safeStr(req.body.secondReferenceRel); 
  app.secondReferenceYears = safeNum(req.body.secondReferenceYears);
  app.secondReferencePhone = safeNum(req.body.secondReferencePhone);

  for (let prop in app) {
    if (app.hasOwnProperty(prop)) {
      req.body[prop] = app[prop].val;
    }
  }

  return next();
}

module.exports = {
  checkEmail,
  checkPhone,
  checkNames,
  checkCode,
  checkPass,
  checkPassTwo,
  checkProps,
  checkId,
  checkAuth,
  checkAdminAuth,
  checkTenantAuth,
  checkImage,
  checkApp
}
