'use strict';

const express = require('express');
const _filter = require('lodash/filter');
const csrf    = require('csurf');

const {
  Tenant,
  User,
} = require('../../lib/models');

const {
  isEmpty,
} = require('../../lib/functions');

const {
  checkEmail,
  checkPhone,
  checkNames,
  checkPass,
  checkPassTwo,
  checkAdminAuth,
  checkEmailParam,
} = require('../../lib/middleware');

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

const router = express.Router();

// Must be admin for all API calls
router.use('/tenant', checkAdminAuth)

// Get all tenants
router.get('/tenant',  (req, res) => {
  const tenant = new Tenant();

  tenant.all()
    .then((allTenants) => {
      const tenants = _filter(allTenants, { type: 'tenant' });

      if (allTenants.length) {
        return res.type('application/json').status(200).send(JSON.stringify(tenants, null, 2));
      }

      return res.status(404).render('error', {
        url: req.hostname + req.originalUrl,
      });
    }).catch((error) => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Get a tenant by email
router.get('/tenant/:email', checkEmailParam, (req, res) => {
  const tenant = new Tenant();
  const email = req.params.email;

  tenant.find({ email })
    .then((tenant) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(tenant, null, 2));
    })
    .catch((error) => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
});

// Create a tenant
router.post('/tenant', checkNames, checkEmail, checkPass, checkPassTwo, checkPhone, (req, res, next) => {
  const tenant = new Tenant();
  const user   = new User();

  const email       = req.body.email;
  const phone       = req.body.phone;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if (isEmpty(email, password, passwordTwo, firstName, lastName)) {
    return res.status(500).send('Something went wrong!');
  }

  if (password !== passwordTwo) {
    return res.status(500).send('Something went wrong!');
  }

  user.hash(password).then((success) => {
    if (!success) {
      return res.status(500).send('Something went wrong!');
    }

    user.setVal('email', email);
    user.setVal('type', 'tenant');

    tenant.setVal('email', email);
    tenant.setVal('phone', phone);
    tenant.setVal('firstName', firstName);
    tenant.setVal('middleName', middleName);
    tenant.setVal('lastName', lastName);

    user.create((error, user) => {
      if (error) {
        return res.status(500).send(error);
      }

      tenant.create((error, admin) => {
        if (error) {
          return res.status(500).send(error);
        }

       return res.status(200).send('Success');
      });
    });
  }).catch((error) => {
    console.log(error);
    return res.status(500).send(error);
  });
});

// Update a tenant by email
router.put('/tenant/:email', checkEmailParam, (req, res, next) => {
  const tenant = new Tenant();
  console.log('email: ', req.params.email);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a tenant by email
router.delete('/tenant/:email', checkEmailParam, (req, res, next) => {
  const tenant = new Tenant();

  const email = req.params.email;

  if (isEmpty(email)) {
    return res.status(500).send('Something went wrong!');
  }

  tenant.delete({
    'email': email,
    'type' : 'tenant'
  }, (error, numOfDeletes) => {
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
