"use strict";

const express = require('express');

const property     = require('../../../models/property/Property');
const {checkProps} = require('../../../resources/js/middleware');
const {checkId}    = require('../../../resources/js/middleware');
const {isEmpty}    = require('../../../resources/js/functions');
const {checkAuth}  = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/properties', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('properties', {
    fullName: fullName
  });
});

router.post('/properties', checkAuth, function(req, res, next) {
  
});

module.exports = router;
