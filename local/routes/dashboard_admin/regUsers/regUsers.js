"use strict";
const express    = require('express');
const moment     = require('moment');

const {createRegUser} = require('../../../api/tenants/create');
const {deleteRegUser} = require('../../../api/tenants/delete');

const {checkEmail}     = require('../../../resources/js/check');
const {checkPass}      = require('../../../resources/js/check');
const {checkPassTwo}   = require('../../../resources/js/check');

const router  = express.Router();

router.get('/regUsers', function(req, res) {
  res.render('regUsers');
});

router.post('/regUsers/create', checkEmail, checkPass, checkPassTwo, function(req, res, next) {

  const email       = req.body.email;
  const password    = req.body.password;
  const passwordTwo = req.body.passwordTwo;

  if(!email)
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
      match: false 
    });

  createRegUser(email, password, function(error, regUser) {
    if(error)
      return res.render('regUsers', {
        createSuccess: false
      });
    return res.render('regUsers', {
      createSuccess: true,
    });
  });
});

router.post('/regUsers/delete', checkEmail, function(req, res, next) {

  const email = req.body.email;

  if(!email)
    return res.render('regUsers', {
      deleteSuccess: false
    });
    
  deleteRegUser(email, function(error, response) {
    if(error)
      return res.render('regUsers', {
        deleteSuccess: false
      });
    if(!response.deletedCount)
      return res.render('regUsers', {
        deleteSuccess: false
      });
    return res.render('regUsers', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
