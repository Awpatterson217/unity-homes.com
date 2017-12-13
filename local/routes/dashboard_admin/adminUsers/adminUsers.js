"use strict";

const express = require('express');
const moment  = require('moment');

const {checkEmail}   = require('../../../resources/js/middleware');
const {checkNames}   = require('../../../resources/js/middleware');
const {checkPass}    = require('../../../resources/js/middleware');
const {checkPassTwo} = require('../../../resources/js/middleware');
const {checkAuth}    = require('../../../resources/js/middleware');
const {isEmpty}      = require('../../../resources/js/functions');

const router = express.Router();

router.get('/adminUsers', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('adminUsers', {
    fullName: fullName
  });
});

router.post('/adminUsers', checkAuth, function(req, res, next) {
  
});

module.exports = router;
