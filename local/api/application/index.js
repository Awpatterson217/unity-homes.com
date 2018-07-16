"use strict";

const express = require('express');
const csrf    = require('csurf');

const Application = require('../../lib/models/Application');
const { isEmpty } = require('../../lib/functions');
const {
  checkApp,
  checkAdminAuth,
  checkEmailParam
  } = require('../../lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be authorized for all API calls
router.all('/application', function(req, res, next) {
  next();
});

// Get all applications
router.get('/application', checkAdminAuth, function(req, res) {
  const application = new Application();

  application.all()
    .then( apps => {
      if (apps.length) {
        return res.type('application/json').status(200).send(JSON.stringify(apps, null, 2));
      }

      return res.status(404).render('error', {
        url: req.hostname + req.originalUrl,
      });
    }).catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send('Something went wrong!');
    });
});

// Get application by email
router.get('/application/:email', checkEmailParam, function(req, res) {
  const application = new Application();

  const email = req.params.email;

  application.find({ email })
    .then((app) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(app, null, 2));
    })
      .catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Create an application
router.post('/application/create', checkApp, function(req, res, next) {
  const application = new Application();

  application.fill(req, function(error, dataObj) {
    if (error) {
      return res.status(500).send(error);
    }
  });

  application.create(function(error, app) {
    if (error) {
      return res.status(500).send(error);
    }

    return res.status(200).send('Success');
  });
});

// Update an application by email
router.put('/application/:email', checkEmailParam, checkApp, function(req, res, next) {
  const application = new Application();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete an application by email
router.delete('/application/:email', checkEmailParam, function(req, res, next) {
  const application = new Application();

  const email = req.params.email;

  if (email === '') {
    return res.status(500).send('Something went wrong!');
  }

  application.delete({
    'email': email
  }, function(error, numOfDeletes) {
    if (error) {
      return res.status(500).send('Something went wrong!');
    }

    if (!numOfDeletes) {
      return res.status(500).send('Something went wrong!');
    }

    return res.status(200).send('Success');
  });
});

module.exports = router;
