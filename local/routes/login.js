"use strict";
const express    = require('express');
const moment     = require('moment');
const bodyParser = require('body-parser');
const csrf       = require('csurf');

const {findRegUser}     = require('../api/tenants/read');
const {sanitize}        = require('../resources/js/sanitize');
const {isPassFormatted} = require('../resources/js/sanitize');

//const csrfProtection = csrf();
const router         = express.Router();
//const parseForm      = bodyParser.urlencoded({ extended: false });

//router.use(csrf({ sessionKey:'sessionid' }))
// { csrfToken: req.csrfToken() }

router.get('/login', function(req, res) {
  res.render('login');
});
  
router.post('/login', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

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

  findRegUser(safeEmail, function(error, user) {
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

// handle csrf errors specifically
//router.use(function(err, req, res, next) {
//    if (err.code !== 'EBADCSRFTOKEN') return next(err);
//    res.status(403).send("ERROR: session has expired or been tampered with");
//});

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
