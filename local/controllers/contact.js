"use strict";

const express = require('express');

const router = express.Router();

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
