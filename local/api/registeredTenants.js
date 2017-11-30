"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let registeredTenant = require('../models/tenant/registeredTenant');

const router = express.Router();

router.get('/registeredTenants/all', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  registeredTenant.all()
  .then( regTenants => {
    return res.send(JSON.stringify(regTenants, null, 2));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.send('500');
  });
});

router.post('/registeredTenants/all', function(req, res, next) {

});

module.exports = router;
