"use strict";
const express = require('express');

const router = express.Router();

router.get('/properties', function(req, res) {
  res.render('properties');
});

module.exports = router;
