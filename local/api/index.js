"use strict";

const administrators      = require('./administrators.js');
const properties          = require('./properties.js');
const unregisteredTenants = require('./unregisteredTenants.js');
const registeredTenants   = require('./registeredTenants.js');

module.exports = {
  administrators     : administrators,
  properties         : properties,
  unregisteredTenants: unregisteredTenants,
  registeredTenants  : registeredTenants,
}
