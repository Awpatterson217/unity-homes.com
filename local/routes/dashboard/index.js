"use strict";

const express = require('express');

const { checkAuth } = require('lib/middleware');

const router = express.Router();

router.get('/dashboard', checkAuth, function(req, res) {
  // const { email, type } = req.session;

  return res.render('dashboard');
});

module.exports = router;
