"use strict";

const express = require('express');
const safe    = require('safe-regex');
const csurf   = require('csurf');

const {isEmpty} = require('../resources/js/functions');

const router = express.Router();

router.get('/apply', function(req, res) {
  return res.render('apply');
});

router.post('/apply', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  // Lots of stuff here...

});

module.exports = router;
