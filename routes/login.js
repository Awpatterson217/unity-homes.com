"use strict";
const express              = require('express');
const { check }            = require('express-validator/check');
const { validationResult } = require('express-validator/check');
const { matchedData }      = require('express-validator/filter');
const validator            = require('validator');

const router  = express.Router();
const passExp = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/

router.get('/login', function(req, res) {
  res.render('login');
});
  
router.post('/login', function(req, res, next) {

  // Is user input a string?
  if(typeof req.body.email !== 'string')
    return res.render('login', { invalid: true });
  if(typeof req.body.password !== 'string')
    return res.render('login', { invalid: true });

  // remove white space
  let trimEmail = validator.trim(req.body.email);
  let trimPw    = validator.trim(req.body.password);

  // Is user input empty? 
  if(validator.isEmpty(trimEmail))
      return res.render('login', { invalid: true });
  if(validator.isEmpty(trimPw))
      return res.render('login', { invalid: true });

  // Replace <, >, &, ', " and / with HTML entities.
  let escapedEmail = validator.escape(trimEmail);
  let escapedPw    = validator.escape(trimPw);

  let authorized = false;
  let owner      = false;
  let tenant     = false;
  let time;

  // Is password 8-20 characters
  if(!(validator.isLength(escapedPw, {min: 8, max: 20}))){
    console.log('Not long enough');
    return res.render('login', { invalid: true });
  }

  // Does password have:
  // 1 uppercase
  // 1 lowercase
  // 1 number
  if(!(validator.matches(escapedPw, passExp))){
    return res.render('login', { invalid: true });
  }

  // Log credentials and time here
  const NOW      = new Date().getTime();
  //console.log(NOW);

  // BELOW IS JUST A TEST
  if(escapedEmail === "tenant@unity-homes.com"){
    if(escapedPw=== "Password1"){
      authorized = true;
      tenant     = true;
      time       = NOW;
    }
  }
  if(escapedEmail === "owner@unity-homes.com"){
    if(escapedPw=== "Password1"){
      authorized = true;
      owner      = true;
      time       = NOW;
    }
  }
  if(authorized){
    if(owner){
      return res.render('owner');
    } 
    if(tenant){
      return res.render('tenant');
    }
  }
  res.render('login', { invalid: true });


},
function(req, res) {
    res.redirect('/home');
});

module.exports = router;
