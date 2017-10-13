"use strict";

const express = require('express');

const router = express.Router();

router.get('/contact', function(req, res) {
  return res.render('contact');
});

module.exports = router;
