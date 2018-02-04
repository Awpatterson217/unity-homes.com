"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const Applicant = require('models/Applicant');
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
router.all('/applicant', checkAdminAuth, function(req, res, next) {
  next();
});

// Get all applicant
router.get('/applicant', function(req, res) {
  const applicant = new Applicant();

  applicant.all()
  .then( applicants => {
    return res.type('application/json').status(200).send(JSON.stringify(applicants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send(error);
  });
});

// Get an applicant by email
router.get('/applicant/:email', function(req, res) {
  const applicant = new Applicant();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create an applicant
router.post('/applicant', checkNames, checkEmail, checkPhone, function(req, res, next) {
  const applicant = new Applicant();

  applicant.fill(req, function(error, dataObj) {
    if (error !== null)
      return res.status(500).send(error);
  });

  applicant.create(function(error, user) {
    if (error !== null)
      return res.status(500).send(error);
      console.log('user: ', user);
    return res.status(200).send('Success');
  });
});

// Update an applicant by email
router.put('/applicant/:email', function(req, res, next) {
  const applicant = new Applicant();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete an applicant by email
router.delete('/applicant/:email', checkEmail, function(req, res, next) {
  const applicant = new Applicant();

  const email = req.params.email;

  if (email === '')
    return res.status(500).send('Empty User Identifier!');

  applicant.delete({
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
