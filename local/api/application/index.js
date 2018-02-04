"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const Application = require('models/Application');
const { isEmpty } = require('lib/functions');
const {
  checkEmail,
  checkApp,
  checkAuth,
  checkAdminAuth,
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be authorized for all API calls
router.all('/application', checkAuth, function(req, res, next) {
  next();
});

// Get all applications
router.get('/application', checkAdminAuth, function(req, res) {
  const application = new Application();

  application.all()
  .then( apps => {
    return res.type('application/json').status(200).send(JSON.stringify(apps, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send('Something went wrong!');
  });
});

// Get application by email
router.get('/application/:email', function(req, res) {
  const application = new Application();
  // TODO
  console.log('email: ', req.params.email);
  return res.status(500).send('Something went wrong!');
});

// Create an application
router.post('/application/create', checkApp, function(req, res, next) {
  const application = new Application();

  application.fill(req, function(error, dataObj) {
    if (error !== null)
      return res.status(500).send(error);
  });

  application.create(function(error, app) {
    if (error !== null)
      return res.status(500).send(error);

    return res.status(200).send('Success');
  });
});

// Update an application by email
router.put('/application/:email', checkApp, function(req, res, next) {
  const application = new Application();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete an application by email
router.delete('/application/:email', checkEmail, function(req, res, next) {
  const application = new Application();

  const email = req.params.email;

  if (email === '')
    return res.status(500).send('Something went wrong!');

  application.delete({
    'email': email
  }, function(error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send('Something went wrong!');

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
