"use strict";

const express = require('express');

const unregisteredTenant = require('../../../models/tenant/unregisteredTenant');
const {checkNames}       = require('../../../resources/js/check');
const {checkEmail}       = require('../../../resources/js/check');

const router = express.Router();

router.get('/unregUsers', function(req, res) {
  return res.render('unregUsers');
});

router.post('/unregUsers/create', checkNames, checkEmail, function(req, res, next) {
  const email       = req.body.email;
  const firstName   = req.body.firstName;
  const middleName  = req.body.middleName;
  const lastName    = req.body.lastName;

  if(email === '' || firstName === '' || lastName === '')
    return res.render('unregUsers', {
      createSuccess: false
    });

  unregisteredTenant.setVal('email', email);
  unregisteredTenant.setVal('firstName', firstName);
  unregisteredTenant.setVal('middleName', middleName);
  unregisteredTenant.setVal('lastName', lastName);
  unregisteredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  unregisteredTenant.create(function(error, user){
    if(error !== null){
      return res.render('unregUsers', {
        createSuccess: false
      });
    }

    return res.render('unregUsers', { 
      createSuccess: true
    });
  });
});

router.post('/unregUsers/delete', function(req, res, next) {
  const email = req.body.email;

  if(email === '')
    return res.render('unregUsers', {
      deleteSuccess: false
    });

  unregisteredTenant.delete({
    'email': email
  }, function(error, numOfDeletes){
    if(error !== null)
      return res.render('unregUsers', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('unregUsers', {
        deleteSuccess: false
      });  

    return res.render('unregUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
