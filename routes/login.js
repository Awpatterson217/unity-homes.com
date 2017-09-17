"use strict";
const express              = require('express');
const { check, validationResult, sanitize }            = require('express-validator/check');
const { matchedData }      = require('express-validator/filter');

const router  = express.Router();
const passExp = /[0-9]{1}[A-Z]{1}[a-z]{1}\S/

router.get('/login', function(req, res) {
  res.render('login');
});
  
router.post('/login', [
    // Check validity
    check("email", "Invalid email")
    .isEmail()
    .exists(),
    check("password", "invalid password")
        .exists()
        .isLength({ min: 8 })
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password) {
                // throw error if passwords do not match
                throw new Error("Passwords don't match");
            } else 
                return value;
        })
],
function(req, res, next) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // LOG ERRORS HERE
    res.render('login', { invalid: true });
  }

  if (errors.isEmpty()) {
    let authorized = false;
    let owner      = false;
    let tenant     = false;
    let time;
    const NOW      = new Date().getTime();
    //console.log(NOW);   // LOG credentials and time here
    // BELOW IS JUST A TEST
    if(req.body.email && req.body.password){
      if(req.body.email === "tenant@unity-homes.com"){
        if(req.body.password === "password"){
          authorized = true;
          tenant     = true;
          time       = NOW;
        }
      }
      if(req.body.email === "owner@unity-homes.com"){
        if(req.body.password === "password"){
          authorized = true;
          owner      = true;
          time       = NOW;
        }
      }
    }
    if(authorized){
      if(owner){
        // Create session here
        return res.render('owner');
      } 
      if(tenant){
        // Create session here
        return res.render('tenant');
      }
    }
    res.render('login', { invalid: true });
  }
},
function(req, res) {
    res.redirect('/home');
});

module.exports = router;
