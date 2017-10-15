"use strict";

const express = require('express');
const moment  = require('moment');

const {checkEmail}       = require('../../resources/js/middleware');
const {checkPass}        = require('../../resources/js/middleware');
const {checkPassTwo}     = require('../../resources/js/middleware');
const {checkAuth}        = require('../../resources/js/middleware');
const {adminData}        = require('../../resources/js/functions');

const router = express.Router();

router.get('/admin', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let firstName = req.session.firstName;
  let lastName  = req.session.lastName;
  let fullName  = firstName + ' ' + lastName;

  adminData(fullName, (error, data) => {
    if(error !== null)
      return res.send('ERROR: See Server Administrator');
    return res.render('admin', {
      fullName           : fullName,
      unregisteredTenants: data.unregisteredTenants,
      registeredTenants  : data.registeredTenants,
      properties         : data.properties
    });
  });
});

module.exports = router;
