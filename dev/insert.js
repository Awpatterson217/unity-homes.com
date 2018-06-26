"use strict";

const User          = require('../local/node_modules/models/User');
const Administrator = require('../local/node_modules/models/Administrator');
const Tenant        = require('../local/node_modules/models/Tenant');
const Application   = require('../local/node_modules/models/Application');
const Property      = require('../local/node_modules/models/Property');

const admin   = new Administrator();
const tenant  = new Tenant();
const userOne = new User();
const userTwo = new User();
const app     = new Application();

const propOne     = new Property();
const propTwo     = new Property();
const propThree   = new Property();

function insertAdmin() {
  admin.setVal("email", "admin@unity.com");
  admin.setVal("firstName", "adam");
  admin.setVal("middleName", "w");
  admin.setVal("lastName", "patterson");
  admin.setVal("firstLogin", "false");

  userTwo.setVal("email", "admin@unity.com");
  userTwo.setVal("type", "admin");
  userTwo.hash("Password1")
    .then(() => {
      userTwo.create((error, thisUser) => {
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

function insertApp() {
  console.log("No Application Created!");
}

function insertProps() {
  propOne.setVal("type", "condominium");
  propOne.setVal("street", "109 W Walnut St");
  propOne.setVal("city", "Tolono");
  propOne.setVal("state", "IL");
  propOne.setVal("zip", "61880");
  propOne.setVal("stories", "1");
  propOne.setVal("rent", "1080.00");
  propOne.setVal("occupied", "true");
  propOne.setVal("occupants", "2");
  propOne.setVal("sqft", "1500");
  propOne.setVal("year", "1965");
  propOne.setVal("washer", "false");
  propOne.setVal("dryer", "false");
  propOne.setVal("garage", "false");
  propOne.setVal("basement", "false");
  propOne.setVal("fence", "true");
  propOne.create((error, thisProp) => {
    if (error) {
      return console.log("Error while creating test property: ", error);
    }
    console.log(`Property Created: ${thisProp}`);
  });

  propTwo.setVal("type", "apartment");
  propTwo.setVal("street", "110 W Walnut St");
  propTwo.setVal("city", "Tolono");
  propTwo.setVal("state", "IL");
  propTwo.setVal("zip", "61880");
  propTwo.setVal("stories", "1");
  propTwo.setVal("rent", "1200.00");
  propTwo.setVal("occupied", "false");
  propTwo.setVal("occupants", "0");
  propTwo.setVal("sqft", "1600");
  propTwo.setVal("year", "1963");
  propTwo.setVal("washer", "true");
  propTwo.setVal("dryer", "true");
  propTwo.setVal("garage", "false");
  propTwo.setVal("basement", "true");
  propTwo.setVal("fence", "false");
  propTwo.create((error, thisProp) => {
    if (error) {
      return console.log("Error while creating test property: ", error);
    }
    console.log(`Property Created: ${thisProp}`);
  });

  propThree.setVal("type", "single-family home");
  propThree.setVal("street", "123 Main St");
  propThree.setVal("city", "Champaign");
  propThree.setVal("state", "IL");
  propThree.setVal("zip", "61820");
  propThree.setVal("stories", "2");
  propThree.setVal("rent", "1500.00");
  propThree.setVal("occupied", "true");
  propThree.setVal("occupants", "3");
  propThree.setVal("sqft", "1950");
  propThree.setVal("year", "1982");
  propThree.setVal("washer", "true");
  propThree.setVal("dryer", "true");
  propThree.setVal("garage", "true");
  propThree.setVal("basement", "false");
  propThree.setVal("fence", "false");
  propThree.create((error, thisProp) => {
    if (error) {
      return console.log("Error while creating test property: ", error);
    }
    console.log(`Property Created: ${thisProp}`);
  });
}

function insertTenant() {
  tenant.setVal("email", "tenant@unity.com");
  tenant.setVal("firstName", "adam");
  tenant.setVal("middleName", "w");
  tenant.setVal("lastName", "patterson");
  tenant.setVal("isRegistered", "true");

  userOne.setVal("email", "tenant@unity.com");
  userOne.setVal("type", "tenant");
  userOne.hash("Password1")
    .then(() => {
      userOne.create((error, thisUser) => {
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

insertAdmin();
insertTenant();
insertProps();
insertApp();
