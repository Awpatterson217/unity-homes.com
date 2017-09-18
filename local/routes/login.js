"use strict";
// VENDOR
const express = require('express');
const moment  = require('moment');
const safe    = require('safe-regex');
const csrf    = require('csurf');

// LOCAL
const { findUser }        = require('../api/authenticate');
const { sanitize }        = require('../resources/js/sanitize');
const { isPassFormatted } = require('../resources/js/sanitize');

// {sessionKey: Math.random().toString(36).slice(2)}
const csrfProtection = csrf();
const router         = express.Router();

router.get('/login', csrfProtection,function(req, res) {
  res.render('login', { csrfToken: req.csrfToken() });
});
  
router.post('/login', csrfProtection, function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  if(!safe(req.body.email))
    return res.render('login', { invalid: true });
  if(!safe(req.body.password))
    return res.render('login', { invalid: true });

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

  if(!safeEmail)
    return res.render('login', { invalid: true });
  if(!safePassword)
    return res.render('login', { invalid: true });

  findUser(safeEmail, function(error, user) {
    if(error)
      return res.render('login', { invalid: true });
    
    if(user.password !== safePassword)
      return res.render('login', { invalid: true });
    
    if(user.type === 'owner')
      return res.render('owner', {time: moment(NOW).format('LLL')});
    
    if(user.type === 'tenant')
      return res.render('tenant', {time: moment(NOW).format('LLL')});
  });

});

/*
router.get('/logout',function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
          res.redirect('/home');
      }
  });
});
*/

module.exports = router;
