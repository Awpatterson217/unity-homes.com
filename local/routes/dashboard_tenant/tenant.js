"use strict";

const express = require('express');
const moment  = require('moment');

const {checkAuth} = require('../../resources/js/middleware');

const router = express.Router();

router.get('/tenant', checkAuth, function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  let firstName = req.session.firstName;
  let lastName  = req.session.lastName;

  let fullName = firstName + ' ' + lastName;

  res.render('tenant', {
    fullName: fullName,
    time    : moment(NOW).format('LLL')
  });
});

module.exports = router;
