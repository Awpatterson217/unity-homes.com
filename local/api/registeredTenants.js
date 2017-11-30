"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let registeredTenant = require('../models/tenant/registeredTenant');

const router = express.Router();

router.get('/registeredTenants', function(req, res) {
  // return res.render('apply');
});

router.post('/registeredTenants', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  // return res.render('apply');

});

let getRegTenants = async function(fullName, callback){
  try{
    let registeredTenants = await registeredTenant.all();

    return callback(null, registeredTenants);
  }catch(error){
    return callback(error);
  }
}

module.exports = router;
