"use strict";

const express = require('express');
const moment  = require('moment');
const csrf    = require('csurf');

const registeredTenant   = require('../models/tenant/registeredTenant');
const unregisteredTenant = require('../models/tenant/unregisteredTenant');
const {checkEmail}       = require('../resources/js/check');
const {checkCode}        = require('../resources/js/check');
const {checkPass}        = require('../resources/js/check');
const {checkPassTwo}     = require('../resources/js/check');

//const csrfProtection = csrf();
//{ csrfToken: req.csrfToken() }
const router = express.Router();

router.get('/register', function(req, res) {
  return res.render('register');
});

router.post('/register', checkCode, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  let time; // TODO Log time and req
  const now       = new Date().getTime();
  const timestamp = Math.floor(Date.now() / 1000).toString()

  const code        = req.body.code;
  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(code === '' || email === '' || password === '' || passwordTwo === '')
    return res.render('register', {
      invalid: true
    });

  if(password !== passwordTwo)
    return res.render('register', {
      match: false
    });

  unregisteredTenant.find({
    'email': email,
    'code': code
  }, function(error, user, numOfUsers){
    if(error !== null)
      return res.render('register', {
        invalid: true
      });

    if(numOfUsers === 1){
      registeredTenant.hash(password).then(function(success){
        if(!success)
          return res.render('register', {
            invalid: true
          });

        registeredTenant.setVal('email', email);
        registeredTenant.setVal('timestamp', timestamp);

        registeredTenant.create(function(error, user){
          if(error !== null){
            return res.render('register', {
              invalid: true
            });
          }
          return res.render('registered', {
            time    : moment(now).format('LLL'),
            email   : email,
            type    : user.type,
            password: password
          });
        });
      }).catch(function(error){
        // TODO: Log error
        console.log(error);
      });

    }else{
      return res.render('register', {
        invalid: true
      });
    }
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
