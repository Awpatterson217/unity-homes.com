"use strict";
const express = require('express');
const moment  = require('moment');
const csrf    = require('csurf');

const {findUnregUser}   = require('../api/tenants/read');
const {createRegUser}   = require('../api/tenants/create');

const {checkEmail}     = require('../resources/js/check');
const {checkCode}      = require('../resources/js/check');
const {checkPass}      = require('../resources/js/check');
const {checkPassTwo}   = require('../resources/js/check');

//const csrfProtection = csrf();
//{ csrfToken: req.csrfToken() }
const router = express.Router();

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', checkCode, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  const code        = req.body.code;
  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(!code || !email || !password || !passwordTwo)
    return res.render('register', {invalid: true});

  if(password !== passwordTwo)
    return res.render('register', {match: false});
  
  findUnregUser(email, function(error, unRegUser) {

    if(error) // TODO Log error
      return res.render('register', {invalid: true});

    if(unRegUser.code !== code)
      return res.render('register', {invalid: true});

    createRegUser(email, password, function(error, regUser) {

      if(error)
        return res.render('register', {invalid: true});
              
      return res.render('registered', {
        time: moment(NOW).format('LLL'),
        email: email,
        type: regUser.type,
        password: password
      });
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
