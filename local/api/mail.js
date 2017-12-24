const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const Mail           = require('../models/mail/Mail');
const {checkEmail}   = require('../resources/js/middleware');
const {checkAuth}    = require('../resources/js/middleware');
const {checkNames}   = require('../resources/js/middleware');
const {checkPass}    = require('../resources/js/middleware');
const {checkPassTwo} = require('../resources/js/middleware');

const router = express.Router();

router.get('/mail/read', checkAuth, function(req, res) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.get('/mail/read', checkAuth, function(req, res) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/mail/create', checkAuth, function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/mail/update', checkAuth, function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/mail/delete', checkAuth, function(req, res, next) {
  const mail = new Mail();
  // TODO
  return res.status(500).send('Something went wrong!');
});

module.exports = router;