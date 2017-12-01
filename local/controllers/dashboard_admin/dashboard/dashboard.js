"use strict";

const express = require('express');
const moment  = require('moment');

const {checkAuth}    = require('../../../resources/js/middleware');
const {adminData}    = require('../../../resources/js/functions');

const router = express.Router();

router.get('/dashboard', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  adminData(fullName, (error, data) => {
    if(error !== null)
      return res.status(500).send('ERROR: See Server Administrator');
    return res.render('dashboard', {
      fullName: fullName
    });
  });
});

module.exports = router;
