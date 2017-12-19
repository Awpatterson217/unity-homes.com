"use strict";

const express = require('express');

const {checkAuth}    = require('../../resources/js/middleware');
const {adminData}    = require('../../resources/js/functions');

const router = express.Router();

router.get('/admin', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  const fullName = req.session.firstName + ' ' + req.session.lastName;

  adminData(fullName, (error, data) => {
    if(error !== null)
      return res.status(500).send('ERROR: See Server Administrator');
    return res.render('admin', {
      fullName: fullName
    });
  });
});

module.exports = router;
