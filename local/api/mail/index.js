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
  checkPassTwo,
  checkIdParam,
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// get all mail
router.get('/mail', function(req, res) {
  const mail = new Mail();

  // TODO

  return res.status(500).send('Something went wrong!');
});

// Get a mail by id
router.get('/mail/:id', checkIdParam, function(req, res) {
  const mail = new Mail();

  console.log('id: ', req.params.id);

  const id = req.params.id;

  mail.find({ id })
    .then((thisMail) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(thisMail, null, 2));
    })
    .catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Create a mail
router.post('/mail', function(req, res, next) {
  const mail = new Mail();

  // TODO

  return res.status(500).send('Something went wrong!');
});

// Update a mail by id
router.put('/mail/:id', checkIdParam, function(req, res, next) {
  const mail = new Mail();

  const id = req.params.id;

  // TODO

  return res.status(500).send('Something went wrong!');
});

// Delete a mail by id
router.delete('/mail/:id', checkIdParam, function(req, res, next) {
  const mail = new Mail();

  console.log('id: ', req.params.id);

  const id = req.params.id;

  // TODO

  return res.status(500).send('Something went wrong!');
});

module.exports = router;