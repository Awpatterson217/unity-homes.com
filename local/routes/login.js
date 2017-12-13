"use strict";

const express    = require('express');
const moment     = require('moment');
const bodyParser = require('body-parser');
const csrf       = require('csurf');

const RegisteredTenant = require('../models/tenant/RegisteredTenant');
const {checkEmail}     = require('../resources/js/middleware');
const {checkPass}      = require('../resources/js/middleware');
const {isEmpty}        = require('../resources/js/functions');

//const csrfProtection = csrf();
const router = express.Router();
//const parseForm      = bodyParser.urlencoded({ extended: false });

//router.use(csrf({ sessionKey:'sessionid' }))
// { csrfToken: req.csrfToken() }

router.get('/login', function(req, res) {
  return res.render('login');
});
  
router.post('/login', checkEmail, checkPass, function(req, res, next) {
  let time;
  const NOW = new Date().getTime();
  const registeredTenant = new RegisteredTenant();

  const email    = req.body.email;
  const password = req.body.password;
  const year     = 365 * 24 * 60 * 60 * 1000;
  if (req.body.remember)
    res.cookie('remember', email, { maxAge: year });

  if(isEmpty(email, password))
    return res.render('login', { invalid: true });

  registeredTenant.authenticate(email, password, function(error, user){
    if(error !== null)
      return res.render('login', {
        invalid: true
      });

    req.session.firstName = user.firstName;
    req.session.lastName  = user.lastName;
    req.session.userAuth  = true;

    if(user.type === 'admin')
      return res.redirect('/admin');
    if(user.type === 'tenant')
      return res.redirect('/tenant');
  });
});

/*
res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
*/
// TODO CSRF

// handle csrf errors specifically
//router.use(function(err, req, res, next) {
//    if (err.code !== 'EBADCSRFTOKEN') return next(err);
//    res.status(403).send("ERROR: session has expired or been tampered with");
//});

module.exports = router;
