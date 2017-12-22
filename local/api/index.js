"use strict";

const administrators    = require('./administrators.js');
const properties        = require('./properties.js');
const unregisteredUsers = require('./unregisteredUsers.js');
const registeredUsers   = require('./registeredUsers.js');
const applications      = require('./applications.js');
const billing           = require('./billing.js');

module.exports = {
  administrators,
  properties,
  unregisteredUsers,
  registeredUsers,
  applications,
  billing
}
