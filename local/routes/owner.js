"use strict";
const express    = require('express');
const moment     = require('moment');
const bodyParser = require('body-parser');
const csrf       = require('csurf');

const {create}                 = require('../api/add');
const {removeUnregisteredUser} = require('../api/remove');
const {sanitize}               = require('../resources/js/sanitize');

//const csrfProtection = csrf();
const router  = express.Router();
//const parseForm      = bodyParser.urlencoded({ extended: false });

//router.use(csrf({ sessionKey:'sessionid' }))
// { csrfToken: req.csrfToken() }

router.post('/owner/add', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  let safeEmail = sanitize(req.body.email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  let safeCode = sanitize(req.body.code, function(error, code) {
    if(error) // TODO Log error
      return false;
    return code;
  });

  if(!safeEmail)
    return res.render('owner', {
      insertSuccess: false,
      time: moment(NOW).format('LLL')
    });
  if(!safeCode)
    return res.render('owner', {
      insertSuccess: false,
      time: moment(NOW).format('LLL')
    });
  create(safeEmail, safeCode, function(error, newUser) {
    if(error)
      return res.render('owner', {
        insertSuccess: false,
        time: moment(NOW).format('LLL')
      });
    return res.render('owner', { 
      insertSuccess: true,
      time: moment(NOW).format('LLL')
    });
  });

});

router.post('/owner/delete', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  let safeEmail = sanitize(req.body.email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });

  if(!safeEmail)
    return res.render('owner', {
      deleteSuccess: false,
      time: moment(NOW).format('LLL')
    });
  removeUnregisteredUser(safeEmail, function(error, response) {
    if(error)
      return res.render('owner', {
        deleteSuccess: false,
        time: moment(NOW).format('LLL')
      });
    if(!response.deletedCount)
      return res.render('owner', {
        deleteSuccess: false,
        time: moment(NOW).format('LLL')
      });
    return res.render('owner', { 
      deleteSuccess: true,
      time: moment(NOW).format('LLL')
    });
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
