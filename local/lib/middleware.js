'use strict';

const validator = require('validator');

const {
  sanitize,
  isPassFormat,
  safeBool,
  safeStr,
  safeNum,
} = require('./safe');

const checkEmail = (req, res, next) => {
  const email = sanitize(req.body.email);

  req.body.email = validator.isEmail(email)
    ? email
    : '';

  return next();
}

const checkEmailParam = (req, res, next) => {
  const email = sanitize(req.params.email);

  req.params.email = validator.isEmail(email)
    ? email
    : '';

  return next();
}

const checkNames = (req, res, next) => {
  const firstName  = sanitize(req.body.firstName);
  const middleName = sanitize(req.body.middleName);
  const lastName   = sanitize(req.body.lastName);

  req.body.firstName = firstName.length < 20
    ? firstName
    : '';

  req.body.middleName = middleName.length
    ? middleName
    : '';

  req.body.lastName = lastName.length < 20
    ? lastName
    : '';

  return next();
}

const checkCode = (req, res, next) => {
  const code = sanitize(req.body.code);

  req.body.code = validator.isNumeric(code)
    ? code
    : '';

  return next();
}

const checkPhone = (req, res, next) => {
  const phone = sanitize(req.body.phone);

  req.body.phone = validator.isNumeric(phone)
    ? phone
    : '';

  return next();
}

const checkPass = (req, res, next) => {
  const pass = sanitize(req.body.password);

  req.body.password = isPassFormat(pass)
    ? pass
    : '';

  return next();
}

const checkPassTwo = (req, res, next) => {
  const pass = sanitize(req.body.passwordTwo);

  req.body.passwordTwo = isPassFormat(pass)
    ?  pass
    : '';

  return next();
}

const checkImage = (req, res, next) => {
  const image = sanitize(req.body.image);

  req.body.image = validator.isDataURI(image)
    ? image
    : '';

  return next();
}

const checkProps = (req, res, next) => {
  const property = {
    mainImage : safeStr(req.body.mainImage),
    street    : safeStr(req.body.street),
    city      : safeStr(req.body.city),
    zip       : safeNum(req.body.zip),
    state     : safeStr(req.body.state),
    type      : safeStr(req.body.type),
    sqft      : safeNum(req.body.sqft),
    washer    : safeBool(req.body.washer),
    dryer     : safeBool(req.body.dryer),
    garage    : safeBool(req.body.garage),
    basement  : safeBool(req.body.basement),
    fence     : safeBool(req.body.fence),
    stories   : safeNum(req.body.stories),
    occupied  : safeBool(req.body.occupied)
  };

  for (let prop in property) {
    if (property.hasOwnProperty(prop)) {
      req.body[prop] = property[prop].val;
    }
  }

  return next();
}

const checkId = (req, res, next) => {
  req.body.id = sanitize(req.body.id);

  return next();
}

const checkIdParam = (req, res, next) => {
  req.params.id = sanitize(req.params.id);

  return next();
}

const checkAdminAuth = (req, res, next) => {
  if (!req.session.userAuth) {
    return res.redirect('/login');
  }

  if (req.session.type !== 'admin') {
    return res.redirect('/login');
  }

  return next();
}

const checkAuth = (req, res, next) => {
  if (!req.session.userAuth) {
    return res.redirect('/login');
  }

  return next();
}

const checkTenantAuth = (req, res, next) => {
  if (!req.session.userAuth) {
    return res.redirect('/login');
  }

  if (req.session.type !== 'tenant') {
    return res.redirect('/login');
  }

  return next();
}

const checkApp = (req, res, next) => {
  const app = {
  // Personal
  email                     : safeEmail(req.body.email),
  phone                     : safeNum(req.body.phone),
  firstName                 : safeStr(req.body.firstName),
  middleName                : safeStr(req.body.middleName),
  lastName                  : safeStr(req.body.lastName),
  dob                       : safeNum(req.body.dob),
  ssn                       : safeNum(req.body.ssn),
  street                    : safeStr(req.body.street),
  city                      : safeStr(req.body.city),
  state                     : safeStr(req.body.state),
  zip                       : safeNum(req.body.zip),
  timeLived                 : safeNum(req.body.timeLived),
  landlordFName             : safeStr(req.body.landlordFName),
  landlordLName             : safeStr(req.body.landlordLName),
  landlordPhone             : safeNum(req.body.landlordPhone),
  // Past Address
  previousStreet            : safeStr(req.body.previousStreet),
  previousCity              : safeStr(req.body.previousCity),
  previousState             : safeStr(req.body.previousState),
  previousZip               : safeNum(req.body.previousZip),
  previousTimeLived         : safeNum(req.body.previousTimeLived),
  previousLandlordFirstName : safeStr(req.body.landlordFName),
  previousLandlordLName     : safeStr(req.body.landlordLName),
  previousLandlordPhone     : safeNum(req.body.previousLandlordPhone),
  // Income
  monthlyIncome             : safeNum(req.body.monthlyIncome),
  // Current Emp
  employer                  : safeStr(req.body.employer),
  employerPhone             : safeNum(req.body.employerPhone),
  employerStreet            : safeStr(req.body.employerStreet),
  employerCity              : safeStr(req.body.employerCity),
  employerState             : safeStr(req.body.employerState),
  employerZip               : safeNum(req.body.employerZip),
  position                  : safeNum(req.body.position),
  timeWorked                : safeNum(req.body.timeWorked),
  supervisorFName           : safeStr(req.body.supervisorFName),
  supervisorLName           : safeStr(req.body.supervisorLName),
  // Previous Emp
  previousEmployer          : safeStr(req.body.previousEmployer),
  previousEmployerPhone     : safeNum(req.body.previousEmployerPhone),
  previousEmployerStreet    : safeStr(req.body.previousEmployerStreet),
  previousEmployerCity      : safeStr(req.body.previousEmployerCity),
  previousEmployerState     : safeStr(req.body.previousEmployerState),
  previousEmployerZip       : safeNum(req.body.previousEmployerZip),
  previousPosition          : safeNum(req.body.previousPosition),
  previousTimeWorked        : safeNum(req.body.previousTimeWorked),
  previousSupervisorFName   : safeStr(req.body.previousSupervisorFName),
  previousSupervisorLName   : safeStr(req.body.previousSupervisorLName),
  // Roommates
  // 1
  firstRoommateFName        : safeStr(req.body.firstRoommateFName),
  firstRoommateLName        : safeStr(req.body.firstRoommateLName),
  firstRelationship         : safeStr(req.body.firstRelationship),
  // 2
  secondRoommateFName       : safeStr(req.body.secondRoommateFName),
  secondRoommateLName       : safeStr(req.body.secondRoommateLName),
  secondRelationship        : safeStr(req.body.secondRelationship),
  // 3
  thirdRoommateFName        : safeStr(req.body.thirdRoommateFName),
  thirdRoommateLName        : safeStr(req.body.thirdRoommateLName),
  thirdRelationship         : safeStr(req.body.thirdRelationship),
  // 4
  fourthRoommateFName       : safeStr(req.body.fourthRoommateFName),
  fourthRoommateLName       : safeStr(req.body.fourthRoommateLName),
  fourthRelationship        : safeStr(req.body.fourthRelationship),
  // Pets
  // 1
  firstPetName              : safeStr(req.body.firstPetName),
  firstPetGender            : safeStr(req.body.firstPetGender),
  firstPetBreed             : safeStr(req.body.firstPetBreed),
  firstPetWeight            : safeNum(req.body.firstPetWeight),
  firstPetAge               : safeNum(req.body.firstPetAge),
  firstPetSpayed            : safeBool(req.body.firstPetSpayed),
  // 2
  secondPetName             : safeStr(req.body.secondPetName),
  secondPetGender           : safeStr(req.body.secondPetGender),
  secondPetBreed            : safeStr(req.body.secondPetBreed),
  secondPetWeight           : safeNum(req.body.secondPetWeight),
  secondPetAge              : safeNum(req.body.secondPetAge),
  secondPetSpayed           : safeBool(req.body.secondPetSpayed),
  // References
  // 1
  firstReferenceFName       : safeStr(req.body.firstReferenceFName),
  firstReferenceLName       : safeStr(req.body.firstReferenceLName),
  firstReferenceRel         : safeStr(req.body.firstReferenceRel), 
  firstReferenceYears       : safeNum(req.body.firstReferenceYears),
  firstReferencePhone       : safeNum(req.body.firstReferencePhone),
  // 2
  secondReferenceFName      : safeStr(req.body.secondReferenceFName),
  secondReferenceLName      : safeStr(req.body.secondReferenceLName),
  secondReferenceRel        : safeStr(req.body.secondReferenceRel),
  secondReferenceYears      : safeNum(req.body.secondReferenceYears),
  secondReferencePhone      : safeNum(req.body.secondReferencePhone)
  }

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
  checkApp,
  checkEmailParam,
  checkIdParam,
};
