"use strict";

const express = require('express');

const registeredTenant = require('../../../models/tenant/registeredTenant');
const {checkEmail}     = require('../../../resources/js/middleware');
const {checkNames}     = require('../../../resources/js/middleware');
const {checkPass}      = require('../../../resources/js/middleware');
const {checkPassTwo}   = require('../../../resources/js/middleware');
const {checkAuth}      = require('../../../resources/js/middleware');
const {isEmpty}        = require('../../../resources/js/functions');

const router = express.Router();

router.get('/regUsers', checkAuth, function(req, res) {
    const now = new Date().getTime();
  // TODO Log time and req

  let firstName = req.session.firstName;
  let lastName  = req.session.lastName;
  let fullName  = firstName + ' ' + lastName;
  
  return res.render('regUsers', {
    fullName: fullName
  });
});

router.post('/regUsers/create', checkAuth, checkNames, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const email       = req.body.email;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(isEmpty(email, password, passwordTwo, firstName, lastName))
    return res.render('regUsers', {
      createSuccess: false
    });

  if(!password)
    return res.render('regUsers', {
      createSuccess: false
    });

  if(!passwordTwo)
    return res.render('regUsers', {
      createSuccess: false
    });

  if(password !== passwordTwo)
    return res.render('regUsers', {
      createSuccess: false,
      match        : false 
    });
  
  registeredTenant.setVal('email', email);
  registeredTenant.setVal('firstName', firstName);
  registeredTenant.setVal('middleName', middleName);
  registeredTenant.setVal('lastName', lastName);
  registeredTenant.hash(password);
  registeredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  registeredTenant.create(function(error, user){
    if(error !== null){
      return res.render('regUsers', {
        createSuccess: false
      });
    }
    return res.render('regUsers', {
      createSuccess: true,
    });
  });

  registeredTenant.hash(password).then(function(success){
    if(!success)
      return res.render('adminUsers', {
        createSuccess: false
      });

    registeredTenant.setVal('email', email);
    registeredTenant.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    registeredTenant.create(function(error, user){
      if(error !== null)
        return res.render('regUsers', {
          createSuccess: false
        });
      
      return res.render('regUsers', {
        createSuccess: true,
      });
    });
  }).catch(function(error){
    console.log(error); // TODO: Log error
  });
});

router.post('/regUsers/delete', checkAuth, checkEmail, function(req, res, next) {
  const email = req.body.email;

  if(email === '')
    return res.render('regUsers', {
      deleteSuccess: false
    });

  registeredTenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('regUsers', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('regUsers', {
        deleteSuccess: false
      });

    return res.render('regUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
