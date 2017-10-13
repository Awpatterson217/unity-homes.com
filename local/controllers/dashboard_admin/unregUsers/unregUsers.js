"use strict";

const express = require('express');
const moment  = require('moment');

const unregisteredTenant = require('../../../models/tenant/unregisteredTenant');
const {checkEmail}       = require('../../../resources/js/check');

const router = express.Router();

router.get('/unregUsers', function(req, res) {
  return res.render('unregUsers');
});

router.post('/unregUsers/create', checkEmail, function(req, res, next) {
  const email = req.body.email;

  unregisteredTenant.setVal('email', email);
  unregisteredTenant.setVal('timestamp',  Math.floor(Date.now() / 1000).toString());

  if(!email)
    return res.render('unregUsers', {
      createSuccess: false
    });

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
