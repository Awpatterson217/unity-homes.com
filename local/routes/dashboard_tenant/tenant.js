"use strict";

const express = require('express');

const {checkAuth} = require('../../resources/js/middleware');

const router = express.Router();

router.get('/tenant', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  const fullName = req.session.firstName + ' ' + req.session.lastName;

  res.render('tenant', {
    fullName
  });
});

module.exports = router;
