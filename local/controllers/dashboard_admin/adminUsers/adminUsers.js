"use strict";

const express = require('express');
const moment  = require('moment');

const administrator  = require('../../../models/admin/administrator');
const {checkEmail}   = require('../../../resources/js/middleware');
const {checkNames}   = require('../../../resources/js/middleware');
const {checkPass}    = require('../../../resources/js/middleware');
const {checkPassTwo} = require('../../../resources/js/middleware');
const {checkAuth}    = require('../../../resources/js/middleware');
const {isEmpty}      = require('../../../resources/js/functions');

const router = express.Router();

router.get('/adminUsers', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('adminUsers', {
    fullName: fullName
  });
});

router.post('/adminUsers/create', checkAuth, checkNames, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email       = req.body.email;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(isEmpty(email, password, passwordTwo, firstName, lastName))
    return res.render('adminUsers', {
      fullName     : fullName,
      createSuccess: false
    });
  if(!password)
    return res.render('adminUsers', {
      fullName     : fullName,
      createSuccess: false
    });
  if(!passwordTwo)
    return res.render('adminUsers', {
      fullName     : fullName,
      createSuccess: false
    });

  if(password !== passwordTwo)
    return res.render('adminUsers', {
      fullName     : fullName,
      createSuccess: false,
      match        : false 
    });

  administrator.hash(password).then(function(success){
    if(!success)
      return res.render('adminUsers', {
        fullName     : fullName,
        createSuccess: false
      });

    administrator.setVal('email', email);
    administrator.setVal('firstName', firstName);
    administrator.setVal('middleName', middleName);
    administrator.setVal('lastName', lastName);
    administrator.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    administrator.create(function(error, user){
      if(error !== null){
        return res.render('adminUsers', {
          fullName     : fullName,
          createSuccess: false
        });
      }
      return res.render('adminUsers', {
        fullName     : fullName,
        createSuccess: true,
      });
    });
  }).catch(function(error){
    console.log(error);
  });
});

router.post('/adminUsers/delete', checkAuth, checkEmail, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email = req.body.email;

  if(email === '')
    return res.render('adminUsers', {
      fullName     : fullName,
      deleteSuccess: false
    });

  administrator.delete({
    'email': email,
    'type' : 'admin'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('adminUsers', {
        fullName     : fullName,
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('adminUsers', {
        fullName     : fullName,
        deleteSuccess: false
      });

    return res.render('adminUsers', {
      fullName     : fullName,
      deleteSuccess: true
    });
  });
});

module.exports = router;
