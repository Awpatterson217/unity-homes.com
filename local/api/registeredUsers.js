"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const _filter = require('lodash/filter');
const csrf    = require('csurf');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const RegisteredTenant = require('../models/tenant/RegisteredTenant');
const {checkEmail}     = require('../resources/js/middleware');
const {checkPhone}     = require('../resources/js/middleware');
const {checkNames}     = require('../resources/js/middleware');
const {checkPass}      = require('../resources/js/middleware');
const {checkPassTwo}   = require('../resources/js/middleware');
const {checkAdminAuth} = require('../resources/js/middleware');
const {isEmpty}        = require('../resources/js/functions');

const router = express.Router();

router.get('/registeredUsers/read', checkAdminAuth, function (req, res) {
  const registeredTenant = new RegisteredTenant();

  registeredTenant.all()
  .then( regUsers => {
    const tenants = _filter(regUsers, {type: 'tenant'} );
    return res.type('application/json').status(200).send(JSON.stringify(tenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send(error);
  });
});

router.get('/registeredUser/read', checkAdminAuth, function (req, res) {
  const registeredTenant = new RegisteredTenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/registeredUser/create', checkAdminAuth, checkNames, checkEmail, checkPass, checkPassTwo, checkPhone, function (req, res, next) {
  const registeredTenant = new RegisteredTenant();

  const email       = req.body.email;
  const phone       = req.body.phone;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if (isEmpty(email, password, passwordTwo, firstName, lastName))
    return res.status(500).send('Missing Data!');

  if (!password)
    return res.status(500).send('Something went wrong!');

  if (!passwordTwo)
    return res.status(500).send('Something went wrong!');

  if (password !== passwordTwo)
    return res.status(500).send('Password Don\'t match!');
  
  registeredTenant.setVal('email', email);
  registeredTenant.setVal('phone', phone);
  registeredTenant.setVal('firstName', firstName);
  registeredTenant.setVal('middleName', middleName);
  registeredTenant.setVal('lastName', lastName);
  registeredTenant.hash(password);
  registeredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  registeredTenant.create(function (error, user) {
    if (error !== null)
      return res.status(500).send(error);

    return res.status(200).send('Success');
  });
});

router.post('/registeredUser/update', checkAdminAuth, function (req, res, next) {
  const registeredTenant = new RegisteredTenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/registeredUser/delete', checkAdminAuth, checkEmail, function (req, res, next) {
  const registeredTenant = new RegisteredTenant();

  const email = req.body.email;

  if (email === '')
    return res.status(500).send('Something went wrong!');

  registeredTenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function (error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send(error);

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
