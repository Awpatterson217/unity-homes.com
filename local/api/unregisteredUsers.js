"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

const unregisteredTenant = require('../models/tenant/unregisteredTenant');
const {checkEmail}       = require('../resources/js/middleware');
const {checkPhone}       = require('../resources/js/middleware');
const {checkNames}       = require('../resources/js/middleware');
const {checkAuth}        = require('../resources/js/middleware');

const router = express.Router();

router.get('/unregisteredUsers/read', checkAuth, function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  unregisteredTenant.all()
  .then( unregTenants => {
    return res.type('application/json').status(200).send(JSON.stringify(unregTenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send('Something went wrong!');
  });
});

router.get('/unregisteredUser/read', checkAuth, function(req, res) {
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/unregisteredUser/create', checkAuth, checkNames, checkEmail, checkPhone, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;

  const email      = req.body.email;
  const firstName  = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName   = req.body.lastName;
  const phone      = req.body.phone;

  if(email === '' || firstName === '' || lastName === '')
    return res.status(500).send('Something went wrong!');

  unregisteredTenant.setVal('email', email);
  unregisteredTenant.setVal('phone', phone);
  unregisteredTenant.setVal('firstName', firstName);
  unregisteredTenant.setVal('middleName', middleName);
  unregisteredTenant.setVal('lastName', lastName);
  unregisteredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  unregisteredTenant.create(function(error, user){

    if(error !== null)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

router.post('/unregisteredUser/update', checkAuth, function(req, res, next) {
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/unregisteredUser/delete', checkAuth, checkEmail, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;

  const email = req.body.email;

  if(email === '')
    return res.status(500).send('Something went wrong!');

  unregisteredTenant.delete({
    'email': email
  }, function(error, numOfDeletes){
    if(error !== null)
      return res.status(500).send('Something went wrong!');

    if(!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
