"use strict";
const express    = require('express');
const moment     = require('moment');
const bodyParser = require('body-parser');
const csrf       = require('csurf');

const {findRegUser} = require('../api/tenants/read');
const {checkEmail}  = require('../resources/js/check');
const {checkPass}   = require('../resources/js/check');

//const csrfProtection = csrf();
const router = express.Router();
//const parseForm      = bodyParser.urlencoded({ extended: false });

//router.use(csrf({ sessionKey:'sessionid' }))
// { csrfToken: req.csrfToken() }

router.get('/login', function(req, res) {
  res.render('login');
});
  
router.post('/login', checkEmail, checkPass, function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  const email    = req.body.email;
  const password = req.body.password;

  if(!email)
    return res.render('login', { invalid: true });
  if(!password)
    return res.render('login', { invalid: true });

  findRegUser(email, function(error, regUser) {
    if(error) // TODO Log error
      return res.render('login', { invalid: true });
    // TODO hash  
    if(regUser.password !== password)
      return res.render('login', { invalid: true });
    if(regUser.type === 'admin')
      return res.render('admin', {time: moment(NOW).format('LLL')});
    if(regUser.type === 'tenant')
      return res.render('tenant', {time: moment(NOW).format('LLL')});
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
