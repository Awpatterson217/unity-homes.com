"use strict";

const express = require('express');
const csrf    = require('csurf');

const Administrator = require('../../lib/models/Administrator');
const User          = require('../../lib/models/User');
const { isEmpty }   = require('../../lib/functions');
const {
  checkEmail,
  checkPass,
  checkPassTwo,
  checkNames,
  checkAdminAuth,
  } = require('../../lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be admin for all API calls
router.use('/administrator', checkAdminAuth)

// Get all administrator
router.get('/administrator', function(req, res) {
  const administrator = new Administrator();

  administrator.all()
    .then( admins => {
      if (admins.length) {
        return res.type('application/json').send(JSON.stringify(admins, null, 2));
      }

        return res.status(404).render('error', {
          url: req.hostname + req.originalUrl,
        });
    }).catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Get an administrator by email
router.get('/administrator/:email', function(req, res) {
  const administrator = new Administrator();
  console.log('email: ', req.params.email);

  const email = req.params.email;

  administrator.find({ email })
    .then((admin) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(admin, null, 2));
    })
    .catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Create an administrator
router.post('/administrator', checkNames, checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const administrator = new Administrator();
  const user          = new User();

  const email       = req.body.email;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if (isEmpty(email, password, passwordTwo, firstName, lastName)) {
    return res.status(500).send('Something went wrong!');
  }

  if (!password) {
    return res.status(500).send('Something went wrong!');
  }

  if (!passwordTwo) {
    return res.status(500).send('Something went wrong!');
  }

  if (password !== passwordTwo) {
    return res.status(500).send('Something went wrong!');
  }

  user.hash(password).then(function(success) {
    if (!success) {
      return res.status(500).send('Something went wrong!');
    }

    user.setVal('email', email);
    user.setVal('type', 'admin');
    user.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    administrator.setVal('email', email);
    administrator.setVal('firstName', firstName);
    administrator.setVal('middleName', middleName);
    administrator.setVal('lastName', lastName);
    administrator.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    user.create(function(error, user) {
      if (error) {
        return res.status(500).send(error);
      }

      administrator.create(function(error, admin) {
        if (error) {
          return res.status(500).send(error);
        }

       return res.status(200).send('Success');
      });
    });
  }).catch(function(error) {
    console.log(error);
    return res.status(500).send(error);
  });
});

// Update an administrator by email
router.put('/administrator/:email', function(req, res, next) {
  const administrator = new Administrator();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete an administrator by email
router.delete('/administrator/:email', checkEmail, function(req, res, next) {
  const administrator = new Administrator();

  const email = req.params.email;

  if (email === '') {
    return res.status(500).send('Something went wrong!');
  }

  administrator.delete({
    'email': email,
    'type' : 'admin'
  }, function(error, numOfDeletes) {
    if (error) {
      return res.status(500).send(error);
    }

    if (!numOfDeletes) {
      return res.status(500).send('Something went wrong!');
    }

    return res.status(200).send('Success');
  });
});

module.exports = router;
