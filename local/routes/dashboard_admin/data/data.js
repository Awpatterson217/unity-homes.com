"use strict";

const express = require('express');

const {checkAuth} = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/data', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req
  const fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('data', {
    fullName: fullName
  });
});

module.exports = router;
