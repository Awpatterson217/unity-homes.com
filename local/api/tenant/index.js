"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const _filter = require('lodash/filter');
const csrf    = require('csurf');

const Tenant      = require('models/Tenant');
const { isEmpty } = require('lib/functions');
const {
  checkEmail,
  checkPhone,
  checkNames,
  checkPass,
  checkPassTwo,
  checkAdminAuth
  } = require('lib/middleware');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const router = express.Router();

// Must be admin for all API calls
router.all('/tenant', checkAdminAuth, function (req, res, next) {
  next();
});

// Get all registered tenants
router.get('/tenant', function (req, res) {
  const tenant = new Tenant();

  tenant.all()
  .then( regUsers => {
    const tenants = _filter(regUsers, {type: 'tenant'} );
    return res.type('application/json').status(200).send(JSON.stringify(tenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send(error);
  });
});

// Get a registered tenant by id
router.get('/tenant/:id', function(req, res) {
  const tenant = new Tenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create a registered tenant
router.post('/tenant', checkNames, checkEmail, checkPass, checkPassTwo, checkPhone, function(req, res, next) {
  const tenant = new Tenant();

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
  
  tenant.setVal('email', email);
  tenant.setVal('phone', phone);
  tenant.setVal('firstName', firstName);
  tenant.setVal('middleName', middleName);
  tenant.setVal('lastName', lastName);
  tenant.hash(password).then(didHash => {
    if(!didHash)
      return res.status(500).send('Something went wrong!');
    tenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
    tenant.create(function(error, user) {
      if (error !== null)
        return res.status(500).send(error);

      return res.status(200).send('Success');
    });
  })
});

// Update a registered tenant by id
router.put('/tenant/:id', function(req, res, next) {
  const tenant = new Tenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a registered tenant by id
router.delete('/tenant/:id', checkEmail, function(req, res, next) {
  const tenant = new Tenant();

  const email = req.body.email;

  if (email === '')
    return res.status(500).send('Something went wrong!');

  tenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function(error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send(error);

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
