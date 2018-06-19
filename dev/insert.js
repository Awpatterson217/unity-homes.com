"use strict";

const User          = require('../local/node_modules/models/User');
const Administrator = require('../local/node_modules/models/Administrator');
const Tenant        = require('../local/node_modules/models/Tenant');

const admin  = new Administrator();
const tenant = new Tenant();
const user   = new User();

function insertAdmin() {
  admin.setVal("email", "admin@unity.com");
  admin.setVal("firstName", "adam");
  admin.setVal("middleName", "w");
  admin.setVal("lastName", "patterson");
  
  user.setVal("email", "admin@unity.com");
  user.setVal("type", "admin");
  user.setVal("firstLogin", "false");
  user.hash("Password1")
    .then(() => {
      user.create((error, thisUser) => {
        if (error) {
          return console.log("Error while creating test user: ", error);
        }
        console.log(`User Created: ${thisUser}`);
  
        // TODO: Create methods should be async functions
        admin.create((error, thisAdmin) => {
          if (error) {
            return console.log("Error while creating test admin");
          }
          console.log(`Admin Created: ${thisAdmin}`);
        })
      })
    });
}

function insertTenant() {
  tenant.setVal("email", "tenant@unity.com");
  tenant.setVal("firstName", "adam");
  tenant.setVal("middleName", "w");
  tenant.setVal("lastName", "patterson");
  
  user.setVal("email", "tenant@unity.com");
  user.setVal("type", "tenant");
  user.setVal("firstLogin", "false");
  user.hash("Password1")
    .then(() => {
      user.create((error, thisUser) => {
        if (error) {
          return console.log("Error while creating test user: ", error);
        }
        console.log(`User Created: ${thisUser}`);
  
        // TODO: Create methods should be async functions
        tenant.create((error, thisTenant) => {
          if (error) {
            return console.log("Error while creating test admin");
          }
          console.log(`Tenant Created: ${thisTenant}`);
        })
      })
    });
}

// insertAdmin();
// insertTenant();
