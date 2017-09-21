"use strict";
// VENDOR
const express = require('express');
const safe    = require('safe-regex');
const csurf   = require('csurf');
// LOCAL
const { sanitize }  = require('../resources/js/sanitize');

const router = express.Router();

router.get('/apply', function(req, res) {
  res.render('apply');
});

router.post('/apply', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  // Lots of stuff here...

});

module.exports = router;
