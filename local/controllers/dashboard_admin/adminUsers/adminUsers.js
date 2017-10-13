"use strict";

const express = require('express');
const moment  = require('moment');

const administrator  = require('../../../models/admin/administrator');
const {checkEmail}   = require('../../../resources/js/check');
const {checkNames}   = require('../../../resources/js/check');
const {checkPass}    = require('../../../resources/js/check');
const {checkPassTwo} = require('../../../resources/js/check');

const router = express.Router();

router.get('/adminUsers', function(req, res) {
  return res.render('adminUsers');
});

router.post('/adminUsers/create', checkNames, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const email       = req.body.email;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(email === '' || password === '' || passwordTwo === '' || firstName === '' || lastName === '')
    return res.render('adminUsers', {
      createSuccess: false
    });
  if(!password)
    return res.render('adminUsers', {
      createSuccess: false
    });
  if(!passwordTwo)
    return res.render('adminUsers', {
      createSuccess: false
    });

  if(password !== passwordTwo)
    return res.render('adminUsers', {
      createSuccess: false,
      match        : false 
    });

  administrator.hash(password).then(function(success){
    if(!success)
      return res.render('adminUsers', {
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
          createSuccess: false
        });
      }
      return res.render('adminUsers', {
        createSuccess: true,
      });
    });
  }).catch(function(error){
    console.log(error);
  });
});

router.post('/adminUsers/delete', checkEmail, function(req, res, next) {
  const email = req.body.email;

  if(email === '')
    return res.render('adminUsers', {
      deleteSuccess: false
    });

  administrator.delete({
    'email': email,
    'type' : 'admin'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('adminUsers', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('adminUsers', {
        deleteSuccess: false
      });

    return res.render('adminUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
