"use strict";
const express = require('express');
const moment  = require('moment');
const csrf    = require('csurf');

const {findUnregUser}   = require('../api/tenants/read');
const {createRegUser}   = require('../api/tenants/create');
const {sanitize}        = require('../resources/js/sanitize');
const {isPassFormatted} = require('../resources/js/sanitize');

//const csrfProtection = csrf();
//{ csrfToken: req.csrfToken() }
const router = express.Router();

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  let safeCode = sanitize(req.body.code, function(error, code) {
    if(error) // TODO Log error
      return false;
    return code;
  });
  let safeEmail = sanitize(req.body.email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  let safePassword = sanitize(req.body.password, function(error, password) {
    if(error) // TODO Log error
      return false;
    if(!isPassFormatted(password))
      return false;
    return password;
  });
  let safeConfirmPassword = sanitize(req.body.confirmPassword, function(error, password) {
    if(error) // TODO Log error
      return false;
    if(!isPassFormatted(password))
      return false;
    return password;
  });

  if(!safeCode)
    return res.render('register', { invalid: true });
  if(!safeEmail)
    return res.render('register', { invalid: true });
  if(!safePassword)
    return res.render('register', { invalid: true });
  if(!safeConfirmPassword)
    return res.render('register', { invalid: true });

  if(safePassword !== safeConfirmPassword)
    return res.render('register', { match: true });
  
  findUnregUser(safeEmail, function(error, unRegUser) {
    if(error) // TODO Log error
      return res.render('register', {
        invalid: true 
      });
    // TODO Check reg code
    if(unRegUser.email !== safeEmail)
      return res.render('register', {
        invalid: true 
      });
  
    // return createRegUser(unRegUser, cbFunction(){ res.render('registered'); });

    // TODO hash  

    // Temporary
    return res.render('registered', {
      time: moment(NOW).format('LLL'),
      code: safeCode,
      email: safeEmail,
      type: newUser.type,
      password: safePassword
    });

  });
});

// TODO CSRF

//router.use(csrf());
//router.use(function (request, response, next) {
// response.locals.csrftoken = request.csrfToken();
// next();
//});

// handle csrf errors specifically
//router.use(function(err, req, res, next) {
//    if (err.code !== 'EBADCSRFTOKEN') return next(err);
//    res.status(403).send("ERROR: session has expired or been tampered with");
//});
  
module.exports = router;
