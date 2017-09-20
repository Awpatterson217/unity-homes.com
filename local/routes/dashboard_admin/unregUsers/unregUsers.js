"use strict";
const express = require('express');
const moment  = require('moment');

const {createUnregUser} = require('../../../api/tenants/create');
const {deleteUnregUser} = require('../../../api/tenants/delete');
const {checkEmail}      = require('../../../resources/js/check');
const {checkCode}       = require('../../../resources/js/check');

const router  = express.Router();

router.get('/unregUsers', function(req, res) {
  res.render('unregUsers');
});

router.post('/unregUsers/create', checkEmail, checkCode, function(req, res, next) {

  const email = req.body.email;
  const code  = req.body.code;

  if(!email)
    return res.render('unregUsers', {
      createSuccess: false
    });
  if(!code)
    return res.render('unregUsers', {
      createSuccess: false
    });

  createUnregUser(email, code, function(error, unregUser) {
    if(error)
      return res.render('unregUsers', {
        createSuccess: false
      });
    return res.render('unregUsers', { 
      createSuccess: true
    });
  });
});

router.post('/unregUsers/delete', function(req, res, next) {

  const email = req.body.email;

  if(!email)
    return res.render('unregUsers', {
      createSuccess: false
    });

  deleteUnregUser(email, function(error, response) {
    if(error)
      return res.render('unregUsers', {
        deleteSuccess: false
      });
    if(!response.deletedCount)
      return res.render('unregUsers', {
        deleteSuccess: false
      });
    return res.render('unregUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
