"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const UnregisteredTenant = require('../models/tenant/UnregisteredTenant');
const {checkEmail}       = require('../resources/js/middleware');
const {checkPhone}       = require('../resources/js/middleware');
const {checkNames}       = require('../resources/js/middleware');
const {checkAdminAuth}   = require('../resources/js/middleware');

const router = express.Router();

router.get('/unregisteredUsers/read', checkAdminAuth, function (req, res) {
  const unregisteredTenant = new UnregisteredTenant();

  unregisteredTenant.all()
  .then( unregTenants => {
    return res.type('application/json').status(200).send(JSON.stringify(unregTenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send(error);
  });
});

router.get('/unregisteredUser/read', checkAdminAuth, function (req, res) {
  const unregisteredTenant = new UnregisteredTenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/unregisteredUser/create', checkAdminAuth, checkNames, checkEmail, checkPhone, function (req, res, next) {
  const unregisteredTenant = new UnregisteredTenant();

  unregisteredTenant.fill(req, function (error, dataObj) {
    if (error !== null)
      return res.status(500).send(error);
  });

  unregisteredTenant.create(function (error, user) {
    if (error !== null)
      return res.status(500).send(error);

    return res.status(200).send('Success');
  });
});

router.post('/unregisteredUser/update', checkAdminAuth, function (req, res, next) {
  const unregisteredTenant = new UnregisteredTenant();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/unregisteredUser/delete', checkAdminAuth, checkEmail, function (req, res, next) {
  const unregisteredTenant = new UnregisteredTenant();

  const email = req.body.email;

  if (email === '')
    return res.status(500).send('Something went wrong!');

  unregisteredTenant.delete({
    'email': email
  }, function (error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send(error);

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
