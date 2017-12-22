"use strict";

const express = require('express');

const {checkAuth} = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/adminUsers', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req
  const fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('adminUsers', {
    fullName: fullName
  });
});

router.post('/adminUsers', checkAuth, function(req, res, next) {
  
});

module.exports = router;
