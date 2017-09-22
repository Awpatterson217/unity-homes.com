"use strict";
const express = require('express');
const moment  = require('moment');

const registeredTenant   = require('../../models/tenant/registeredTenant');
const unregisteredTenant = require('../../models/tenant/unregisteredTenant');
const {checkEmail}       = require('../../resources/js/check');
const {checkPass}        = require('../../resources/js/check');
const {checkPassTwo}     = require('../../resources/js/check');

const router = express.Router();

router.get('/admin', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  return res.render('admin', {
    time: moment(NOW).format('LLL')
  });
  unregisteredTenant.all().then(function(users){
    return res.render('admin', {
      users: users,
      time: moment(NOW).format('LLL')
    });
  }).catch(function(error){
    return console.log(error);
  });
  
});

module.exports = router;
