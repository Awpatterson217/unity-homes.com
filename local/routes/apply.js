"use strict";

const express = require('express');

const router = express.Router();

router.get('/apply', function (req, res) {
  return res.render('apply');
});

module.exports = router;
