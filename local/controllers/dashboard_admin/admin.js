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
  let unregisteredTenants = [];

  /*
  return res.render('admin', {
    time: moment(NOW).format('LLL')
  });
  */

  unregisteredTenant.all()
  .then(function(tenants){
    for(let x = 0; x < tenants.length; x++){
      let thisTenant = {
        email: '',
        code: '',
      };

      unregisteredTenants.push(thisTenant);
    }

    tenants.forEach(function(tenant, index){
      unregisteredTenants[index].email = tenant.email;
      unregisteredTenants[index].code  = tenant.code;
    });

    return res.render('admin', {
      time: moment(NOW).format('LLL'),
      unregisteredTenants: unregisteredTenants,
    });
  })
  .catch(function(error){
    console.log(error);
  });
  

  
});

module.exports = router;
