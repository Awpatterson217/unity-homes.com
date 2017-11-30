"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let registeredTenant = require('../models/tenant/registeredTenant');

const router = express.Router();

router.get('/administrators', function(req, res) {
  // return res.render('administrators');
});

router.post('/administrators', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  // return res.render('administrators');

});

let getAdmins = async function(fullName, callback){
  try{
    let registeredTenants = await registeredTenant.all();

    // TODO sort for admins
    let admins = [];
    return callback(null, admins);
  }catch(error){
    return callback(error);
  }
}

module.exports = router;
