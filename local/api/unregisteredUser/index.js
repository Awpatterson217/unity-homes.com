"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const UnregisteredUser = require('models/UnregisteredUser');
const {
  checkEmail,
  checkPhone,
  checkNames,
  checkAdminAuth
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be admin for all API calls
router.all('/unregisteredUser', checkAdminAuth, function(req, res, next) {
  next();
});

// Get all UnregisteredUser
router.get('/unregisteredUser', function(req, res) {
  const unregisteredUser = new UnregisteredUser();

  unregisteredUser.all()
  .then( unregTenants => {
    return res.type('application/json').status(200).send(JSON.stringify(unregTenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send(error);
  });
});

// Get an UnregisteredUser by id
router.get('/unregisteredUser/:id', function(req, res) {
  const unregisteredUser = new UnregisteredUser();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create an UnregisteredUser
router.post('/unregisteredUser', checkNames, checkEmail, checkPhone, function(req, res, next) {
  const unregisteredUser = new UnregisteredUser();

  unregisteredUser.fill(req, function(error, dataObj) {
    if (error !== null)
      return res.status(500).send(error);
  });

  unregisteredUser.create(function(error, user) {
    if (error !== null)
      return res.status(500).send(error);
      console.log('user: ', user);
    return res.status(200).send('Success');
  });
});

// Update an UnregisteredUser by id
router.put('/unregisteredUser/:id', function(req, res, next) {
  const unregisteredUser = new UnregisteredUser();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete an UnregisteredUser by id
router.delete('/unregisteredUser/:id', checkEmail, function(req, res, next) {
  const unregisteredUser = new UnregisteredUser();

  const email = req.body.email;

  if (email === '')
    return res.status(500).send('Empty User Identifier!');

  unregisteredUser.delete({
    'email': email
  }, function(error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send(error);

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
