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
  const now = new Date().getTime();
  // TODO Log time and req

  if(!req.session.userAuth){
    let responseText = '<h1>No Access!</h1>';
    responseText += '<hr>';
    responseText += '<br /> You may need to <a href=\'/login\'>login again.</a>';

    return res.send(responseText);
  }

  let firstName           = req.session.firstName;
  let lastName            = req.session.lastName;
  let fullName            = firstName + ' ' + lastName;
  let unregisteredTenants = [];
  let registeredTenants   = [];

  unregisteredTenant.all()
  .then(function(tenants){
    for(let x = 0; x < tenants.length; x++){
      let thisTenant = {
        email: '',
        code : '',
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

      // Fake Properties
      const properties = [
        {
          streetAddr: '109 W Walnut Street',
          rented    : 'true'
        },{
          streetAddr: '123 N Fake Street',
          rented    : 'false'
        }
      ];

      return res.render('admin', {
        time: moment(now).format('LLL'),
        fullName           : fullName,
        unregisteredTenants: unregisteredTenants,
        registeredTenants  : registeredTenants,
        properties         : properties
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
