"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let registeredTenant = require('../models/tenant/registeredTenant');

const router = express.Router();

router.get('/administrators/all', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

    registeredTenant.all()
    .then( regTenants => {
      const admins = regTenants.filter( regTenant => {
        (regTenant.type === 'admin')
          return regTenant;
      });

      if(admins.length)
        return res.send(JSON.stringify(admins, null, 2));
    }).catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.send('500');
    });
});

router.post('/administrators/all', function(req, res, next) {

});

let returnAdmins = async function(){

}

module.exports = router;
