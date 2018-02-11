"use strict";

const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  return res.render('home');
});

router.get('/home', function(req, res) {
  return res.render('home');
});

module.exports = router;
