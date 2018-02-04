"use strict";

const express = require('express');
const moment  = require('moment');

const Tenant           = require('models/Tenant');
const UnregisteredUser = require('models/UnregisteredUser');
const { isEmpty }      = require('lib/functions');
const {
  checkEmail,
  checkCode,
  checkPass,
  checkPassTwo
  } = require('lib/middleware');

const router = express.Router();

router.get('/register', function(req, res) {
  return res.render('register');
});

router.post('/register', checkCode, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const unregisteredUser = new UnregisteredUser();
  const tenant = new Tenant();
  // TODO Log time and req
  const now         = new Date().getTime();
  const code        = req.body.code;
  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if (isEmpty(code, email, password, passwordTwo))
    return res.render('register', {
      invalid: true
    });

  if (password !== passwordTwo)
    return res.render('register', {
      match: false
    });

  unregisteredUser.find({ email, code}).then( user => {
    tenant.hash(password).then(function(success) {
      if (!success)
        return res.render('register', {
          invalid: true
        });

      tenant.setVal('email'     , email);
      tenant.setVal('firstName' , user.firstName);
      tenant.setVal('middleName', user.middleName);
      tenant.setVal('lastName'  , user.lastName);
      tenant.setVal('timestamp' ,  Math.floor(Date.now() / 1000).toString());
      tenant.create(function(error, user) {
        if (error !== null) {
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
    }).catch(function(error) {
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
