"use strict";

const express = require('express');

const {checkEmail}     = require('../../../resources/js/middleware');
const {checkPhone}     = require('../../../resources/js/middleware');
const {checkNames}     = require('../../../resources/js/middleware');
const {checkPass}      = require('../../../resources/js/middleware');
const {checkPassTwo}   = require('../../../resources/js/middleware');
const {checkAuth}      = require('../../../resources/js/middleware');
const {isEmpty}        = require('../../../resources/js/functions');

const router = express.Router();

router.get('/users', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('users', {
    fullName: fullName
  });
});

router.post('/users', checkAuth, function(req, res, next) {

});

module.exports = router;
