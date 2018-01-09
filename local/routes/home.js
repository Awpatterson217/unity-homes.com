"use strict";

const express = require('express');

const router = express.Router();

router.get('/home', function (req, res) {
  return res.render('home');
});

module.exports = router;
