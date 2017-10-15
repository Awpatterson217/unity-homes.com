"use strict";

const express = require('express');

const router = express.Router();

const {isEmpty} = require('../resources/js/functions');

router.get('/contact', function(req, res) {
  return res.render('contact');
});

router.post('/contact/send', function(req, res) {

  // Do contact stuff

  return res.render('contact', {
    success: success
  });
});

module.exports = router;
