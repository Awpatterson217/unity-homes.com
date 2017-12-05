"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const _filter = require('lodash/filter');

const registeredTenant = require('../models/tenant/registeredTenant');
const {checkEmail}     = require('../resources/js/middleware');
const {checkPhone}     = require('../resources/js/middleware');
const {checkNames}     = require('../resources/js/middleware');
const {checkPass}      = require('../resources/js/middleware');
const {checkPassTwo}   = require('../resources/js/middleware');
const {checkAuth}      = require('../resources/js/middleware');
const {isEmpty}        = require('../resources/js/functions');

const router = express.Router();

router.get('/registeredUsers/read', checkAuth, function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  registeredTenant.all()
  .then( regUsers => {
    const tenants = _filter(regUsers, {type: 'tenant'} );

    return res.type('application/json').status(200).send(JSON.stringify(tenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send('Something went wrong!');
  });
});

router.get('/registeredUser/read', checkAuth, function(req, res) {
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/registeredUser/create', checkAuth, checkNames, checkEmail, checkPass, checkPassTwo, checkPhone, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;

  const email       = req.body.email;
  const phone       = req.body.phone;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(isEmpty(email, password, passwordTwo, firstName, lastName))
    return res.status(500).send('Something went wrong!');

  if(!password)
    return res.status(500).send('Something went wrong!');

  if(!passwordTwo)
    return res.status(500).send('Something went wrong!');

  if(password !== passwordTwo)
    return res.status(500).send('Something went wrong!');
  
  registeredTenant.setVal('email', email);
  registeredTenant.setVal('phone', phone);
  registeredTenant.setVal('firstName', firstName);
  registeredTenant.setVal('middleName', middleName);
  registeredTenant.setVal('lastName', lastName);
  registeredTenant.hash(password);
  registeredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  registeredTenant.create(function(error, user){
    if(error !== null)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });

  registeredTenant.hash(password).then(function(success){
    if(!success)
      return res.status(500).send('Something went wrong!');

    registeredTenant.setVal('email', email);
    registeredTenant.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    registeredTenant.create(function(error, user){
      if(error !== null)
        return res.status(500).send('Something went wrong!');

      return res.status(200).send('Success');
    });
  }).catch(function(error){
    console.log(error); // TODO: Log error
    return res.status(500).send('Something went wrong!');
  });
});

router.post('/registeredUser/update', checkAuth, function(req, res, next) {
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/registeredUser/delete', checkAuth, checkEmail, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;

  const email = req.body.email;

  if(email === '')
    return res.status(500).send('Something went wrong!');

  registeredTenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.status(500).send('Something went wrong!');

    if(!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
