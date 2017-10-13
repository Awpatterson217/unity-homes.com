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
  const NOW = new Date().getTime();
  let time; // TODO Log time and req
  let unregisteredTenants = [];
  let registeredTenants   = [];

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

  })  
  .then(function(tenants){

    registeredTenant.all()
    .then(function(tenants){
      for(let x = 0; x < tenants.length; x++){
        let thisTenant = {
          email: '',
          type : '',
        };

        registeredTenants.push(thisTenant);
      }

      tenants.forEach(function(tenant, index){
        registeredTenants[index].email = tenant.email;
        registeredTenants[index].type  = tenant.type;
      });

      return res.render('admin', {
        time: moment(NOW).format('LLL'),
        unregisteredTenants: unregisteredTenants,
        registeredTenants  : registeredTenants
      });
      
    })
    .catch(function(error){
      console.log(error);
    });

  })  
  .catch(function(error){
    console.log(error);
  });

});

module.exports = router;
