"use strict"

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const Billing = require('models/Billing');

const {
  checkEmail,
  checkPass,
  checkPassTwo,
  checkNames,
  checkAuth,
  checkAdminAuth,
  checkIdParam,
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Get all billing 
router.get('/billing', checkAdminAuth, function(req, res) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Get a billing by id
router.get('/billing/:id', checkAdminAuth, checkIdParam, function(req, res) {
  const billing = new Billing();

  const id = req.params.id;

  billing.find({ id })
    .then((bill) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(bill, null, 2));
    })
      .catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });

  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create a billing
router.post('/billing', function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Update a billing by id
router.put('/billing/:id', checkIdParam, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a billing by id
router.delete('/billing/:id', checkAdminAuth, checkIdParam, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

module.exports = router;