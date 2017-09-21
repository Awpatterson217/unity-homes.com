"use strict";
const express = require('express');
const moment  = require('moment');

const router = express.Router();

router.get('/admin', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  res.render('admin', {
    time: moment(NOW).format('LLL')
  });
  
});

module.exports = router;
