"use strict";

const express = require('express');

const router = express.Router();

router.get('/listings', function(req, res) {
  return res.render('listings');
});

module.exports = router;
