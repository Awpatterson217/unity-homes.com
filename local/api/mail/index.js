"use strict"

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const Mail = require('models/Mail');
const {
  checkEmail,
  checkAuth,
  checkNames,
  checkPass,
  checkPassTwo
  } = require('../resources/js/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be authorized for all API calls
router.all('/mail', checkAuth, function(req, res, next) {
  next();
});

// get all mail
router.get('/mail', function(req, res) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Get a mail by id
router.get('/mail/:id', function(req, res) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create a mail
router.post('/mail', function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Update a mail by id
router.put('/mail/:id', function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a mail by id
router.delete('/mail/:id', function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

module.exports = router;