"use strict";

const express = require('express');

const unregisteredTenant = require('../../../models/tenant/unregisteredTenant');
const registeredTenant = require('../../../models/tenant/registeredTenant');
const {checkEmail}     = require('../../../resources/js/middleware');
const {checkPhone}     = require('../../../resources/js/middleware');
const {checkNames}     = require('../../../resources/js/middleware');
const {checkPass}      = require('../../../resources/js/middleware');
const {checkPassTwo}   = require('../../../resources/js/middleware');
const {checkAuth}      = require('../../../resources/js/middleware');
const {isEmpty}        = require('../../../resources/js/functions');

const router = express.Router();

router.get('/users', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('users', {
    fullName: fullName
  });
});

router.post('/unregUsers/add', checkAuth, checkNames, checkEmail, checkPhone, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email      = req.body.email;
  const firstName  = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName   = req.body.lastName;
  const phone      = req.body.phone;

  if(email === '' || firstName === '' || lastName === '')
    return res.render('users', {
      fullName     : fullName,
      createSuccess: false
    });

  unregisteredTenant.setVal('email', email);
  unregisteredTenant.setVal('phone', phone);
  unregisteredTenant.setVal('firstName', firstName);
  unregisteredTenant.setVal('middleName', middleName);
  unregisteredTenant.setVal('lastName', lastName);
  unregisteredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  unregisteredTenant.create(function(error, user){
    if(error !== null){
      return res.render('users', {
        fullName     : fullName,
        createSuccess: false
      });
    }

    return res.render('users', { 
      fullName     : fullName,
      createSuccess: true
    });
  });
});

router.post('/unregUsers/delete', checkAuth, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email = req.body.email;

  if(email === '')
    return res.render('users', {
      fullName     : fullName,
      deleteSuccess: false
    });

  unregisteredTenant.delete({
    'email': email
  }, function(error, numOfDeletes){
    if(error !== null)
      return res.render('users', {
        fullName     : fullName,
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('users', {
        fullName     : fullName,
        deleteSuccess: false
      });  

    return res.render('users', {
      fullName     : fullName,
      deleteSuccess: true
    });
  });
});
router.post('/regUsers/add', checkAuth, checkNames, checkEmail, checkPass, checkPassTwo, checkPhone, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email       = req.body.email;
  const phone       = req.body.phone;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(isEmpty(email, password, passwordTwo, firstName, lastName))
    return res.render('users', {
      fullName     : fullName,
      createSuccess: false
    });

  if(!password)
    return res.render('users', {
      fullName     : fullName,
      createSuccess: false
    });

  if(!passwordTwo)
    return res.render('users', {
      fullName     : fullName,
      createSuccess: false
    });

  if(password !== passwordTwo)
    return res.render('users', {
      fullName     : fullName,
      createSuccess: false,
      match        : false 
    });
  
  registeredTenant.setVal('email', email);
  unregisteredTenant.setVal('phone', phone);
  registeredTenant.setVal('firstName', firstName);
  registeredTenant.setVal('middleName', middleName);
  registeredTenant.setVal('lastName', lastName);
  registeredTenant.hash(password);
  registeredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  registeredTenant.create(function(error, user){
    if(error !== null){
      return res.render('users', {
        fullName     : fullName,
        createSuccess: false
      });
    }
    return res.render('users', {
      fullName     : fullName,
      createSuccess: true,
    });
  });

  registeredTenant.hash(password).then(function(success){
    if(!success)
      return res.render('users', {
        fullName     : fullName,
        createSuccess: false
      });

    registeredTenant.setVal('email', email);
    registeredTenant.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    registeredTenant.create(function(error, user){
      if(error !== null)
        return res.render('users', {
          fullName     : fullName,
          createSuccess: false
        });
      
      return res.render('users', {
        fullName     : fullName,
        createSuccess: true,
      });
    });
  }).catch(function(error){
    console.log(error); // TODO: Log error
  });
});

router.post('/regUsers/delete', checkAuth, checkEmail, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const email = req.body.email;

  if(email === '')
    return res.render('users', {
      fullName     : fullName,
      deleteSuccess: false
    });

  registeredTenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('users', {
        fullName     : fullName,
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('users', {
        fullName     : fullName,
        deleteSuccess: false
      });

    return res.render('users', {
      fullName     : fullName,
      deleteSuccess: true
    });
  });
});

module.exports = router;
