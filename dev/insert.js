"use strict";

const User          = require('../local/lib/models/User');
const Administrator = require('../local/lib/models/Administrator');
const Tenant        = require('../local/lib/models/Tenant');
const Application   = require('../local/lib/models/Application');
const Property      = require('../local/lib/models/Property');

const properties   = require('./mockData/properties');
const applications = require('./mockData/applications');

function insertTenant() {
  const user    = new User();
  const tenant  = new Tenant();

  tenant.setVal("email", "tenant@unity.com");
  tenant.setVal("firstName", "adam");
  tenant.setVal("middleName", "w");
  tenant.setVal("lastName", "patterson");
  tenant.setVal("isRegistered", "true");
  tenant.setVal("street", "109 w walnut");
  tenant.setVal("city", "tolono");
  tenant.setVal("state", "illinois");
  tenant.setVal("zip", "61880");
  tenant.setVal("rent", "1080");

  user.setVal("email", "tenant@unity.com");
  user.setVal("type", "tenant");
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

function insertAdmin() {
  const user  = new User();
  const admin = new Administrator();

  admin.setVal("email", "admin@unity.com");
  admin.setVal("firstName", "adam");
  admin.setVal("middleName", "w");
  admin.setVal("lastName", "patterson");

  user.setVal("email", "admin@unity.com");
  user.setVal("type", "admin");
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

function insertApp(application) {
  const app = new Application();

  if (!application) {
    return console.log('No Application Created!');
  }

  app.fill(application, function(error, dataObj) {
    if (error) {
      return console.log('Error filling application');
    }  
  });

  app.create((error, thisApp) => {
    if (error) {
      return console.log("Error while creating test application: ", error);
    }
    console.log(`Application Created: ${thisApp}`);
  });
}

function insertProp(property) {
  const prop = new Property();

  if (!property) {
    return console.log('No Property Created!');
  }

  prop.fill(property, function(error, dataObj) {
    if (error) {
      return console.log('Error filling property');
    }  
  });

  prop.create((error, thisProp) => {
    if (error) {
      return console.log("Error while creating test property: ", error);
    }
    console.log(`Property Created: ${thisProp}`);
  });
}

insertAdmin();
insertTenant();

properties.forEach(property =>
  insertProp(property));

// applications.forEach(application =>
//   insertApp(application));
