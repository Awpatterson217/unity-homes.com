"use strict";

const express = require('express');
const moment  = require('moment');

const registeredTenant = require('../../../models/tenant/registeredTenant');
const {checkEmail}     = require('../../../resources/js/check');
const {checkPass}      = require('../../../resources/js/check');
const {checkPassTwo}   = require('../../../resources/js/check');

const router = express.Router();

router.get('/regUsers', function(req, res) {
  return res.render('regUsers');
});

router.post('/regUsers/create', checkEmail, checkPass, checkPassTwo, function(req, res, next) {
  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(email === '' || password === '' || passwordTwo === '')
    return res.render('regUsers', {
      createSuccess: false
    });

  if(!password)
    return res.render('regUsers', {
      createSuccess: false
    });

  if(!passwordTwo)
    return res.render('regUsers', {
      createSuccess: false
    });

  if(password !== passwordTwo)
    return res.render('regUsers', {
      createSuccess: false,
      match        : false 
    });

  registeredTenant.setVal('email', email);
  registeredTenant.hash(password);
  registeredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());
  registeredTenant.create(function(error, user){
    if(error !== null){
      return res.render('regUsers', {
        createSuccess: false
      });
    }
    return res.render('regUsers', {
      createSuccess: true,
    });
  });

  registeredTenant.hash(password).then(function(success){
    if(!success)
      return res.render('adminUsers', {
        createSuccess: false
      });

    registeredTenant.setVal('email', email);
    registeredTenant.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    registeredTenant.create(function(error, user){
      if(error !== null)
        return res.render('regUsers', {
          createSuccess: false
        });
      
      return res.render('regUsers', {
        createSuccess: true,
      });
    });
  }).catch(function(error){
    console.log(error); // TODO: Log error
  });
});

router.post('/regUsers/delete', checkEmail, function(req, res, next) {
  const email = req.body.email;

  if(email === '')
    return res.render('regUsers', {
      deleteSuccess: false
    });

  registeredTenant.delete({
    'email': email,
    'type' : 'tenant'
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('regUsers', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('regUsers', {
        deleteSuccess: false
      });

    return res.render('regUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
