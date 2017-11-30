"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let unregisteredTenant = require('../models/tenant/unregisteredTenant');

const router = express.Router();

router.get('/unregisteredTenants', function(req, res) {
  // return res.render('');
});

router.post('/unregisteredTenants', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

    // return res.render('');

});

let getRegTenants = async function(fullName, callback){
  try{
    let unregisteredTenants = await unregisteredTenant.all();

    return callback(null, unregisteredTenants);
  }catch(error){
    return callback(error);
  }
}

module.exports = router;
