'use strict';

const express = require('express');

const {
  checkAuth,
} = require('../../lib/middleware');

const router = express.Router();

router.get('/dashboard', checkAuth, (req, res) => res.render('dashboard'));

module.exports = router;
