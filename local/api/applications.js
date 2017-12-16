"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

const Application  = require('../models/application/Application');
const {isEmpty}    = require('../resources/js/functions');
const {checkAuth}  = require('../resources/js/middleware');
const {checkApp}   = require('../resources/js/middleware');
const {checkEmail} = require('../resources/js/middleware');

const router = express.Router();

router.get('/applications/read', checkAuth, function(req, res) {
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

router.get('/application/read', checkAuth, function(req, res) {
  const application = new Application();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/application/create', checkAuth, checkApp, function(req, res, next) {
  const application = new Application();

  application.fill(req, function(error, dataObj) {
    if(error !== null)
      return res.status(500).send(error);
  });

  application.create(function(error, app){
    if(error !== null)
      return res.status(500).send(error);

    return res.status(200).send('Success');
  });
});

router.post('/application/update', checkAuth, checkApp, function(req, res, next) {
  const application = new Application();  
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/application/delete', checkAuth, checkEmail, function(req, res, next) {
  const application = new Application();

  const email = req.body.email;

  if(email === '')
    return res.status(500).send('Something went wrong!');

  application.delete({
    'email': email
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.status(500).send('Something went wrong!');

    if(!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
