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
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be authorized for all API calls
router.all('/billing', checkAuth, function(req, res, next) {
  next();
});

// Get all billing 
router.get('/billing', checkAdminAuth, function(req, res) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Get a billing by id
router.get('/billing/:id', checkAdminAuth, function(req, res) {
  const billing = new Billing();
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
router.put('/billing/:id', function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a billing by id
router.delete('/billing/:id', checkAdminAuth, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

module.exports = router;