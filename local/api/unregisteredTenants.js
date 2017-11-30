"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let unregisteredTenant = require('../models/tenant/unregisteredTenant');

const router = express.Router();

router.get('/unregisteredTenants/all', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  unregisteredTenant.all()
  .then( unregTenants => {
    return res.send(JSON.stringify(unregTenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.send('500');
  });
});

router.post('/unregisteredTenants/all', function(req, res, next) {

});

module.exports = router;
