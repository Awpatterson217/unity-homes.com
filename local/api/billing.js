const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const Billing          = require('../models/billing/Billing');
const {checkEmail}     = require('../resources/js/middleware');
const {checkAuth}      = require('../resources/js/middleware');
const {checkAdminAuth} = require('../resources/js/middleware');
const {checkNames}     = require('../resources/js/middleware');
const {checkPass}      = require('../resources/js/middleware');
const {checkPassTwo}   = require('../resources/js/middleware');

const router = express.Router();

router.get('/billing/read', checkAdminAuth, function(req, res) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.get('/billing/read', checkAdminAuth, function(req, res) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/billing/create', checkAuth, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/billing/update', checkAuth, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/billing/delete', checkAdminAuth, function(req, res, next) {
  const billing = new Billing();
  // TODO
  return res.status(500).send('Something went wrong!');
});

module.exports = router;