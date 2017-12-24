"use strict";

const express = require('express');
const moment  = require('moment');

const RegisteredTenant   = require('../models/tenant/RegisteredTenant');
const UnregisteredTenant = require('../models/tenant/UnregisteredTenant');
const {checkEmail}       = require('../resources/js/middleware');
const {checkCode}        = require('../resources/js/middleware');
const {checkPass}        = require('../resources/js/middleware');
const {checkPassTwo}     = require('../resources/js/middleware');
const {isEmpty}          = require('../resources/js/functions');

const router = express.Router();

router.get('/register', function(req, res) {
  return res.render('register');
});

router.post('/register', checkCode, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const unregisteredTenant = new UnregisteredTenant();
  const registeredTenant = new RegisteredTenant();
  // TODO Log time and req
  const now         = new Date().getTime();
  const code        = req.body.code;
  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(isEmpty(code, email, password, passwordTwo))
    return res.render('register', {
      invalid: true
    });

  if(password !== passwordTwo)
    return res.render('register', {
      match: false
    });

  unregisteredTenant.find({ email, code}).then( user => {
    registeredTenant.hash(password).then(function(success){
      if(!success)
        return res.render('register', {
          invalid: true
        });

      registeredTenant.setVal('email'     , email);
      registeredTenant.setVal('firstName' , user.firstName);
      registeredTenant.setVal('middleName', user.middleName);
      registeredTenant.setVal('lastName'  , user.lastName);
      registeredTenant.setVal('timestamp' ,  Math.floor(Date.now() / 1000).toString());
      registeredTenant.create(function(error, user){
        if(error !== null){
          return res.render('register', {
            invalid: true
          });
        }
        return res.render('registered', {
          time    : moment(now).format('LLL'),
          email   : email,
          password: password
        });
      });
    }).catch(function(error){
      // TODO: Log error
      console.log(error);
      return res.render('register', {
        invalid: true
      });
    });
  }).catch( error => {
      return res.render('register', {
        invalid: true
      });
  });
});
  
module.exports = router;
