'use strict';

const express = require('express');

const router = express.Router();

router.get('/listings', (req, res) => res.render('listings'));

module.exports = router;
