"use strict";

const administrators    = require('./administrators.js');
const properties        = require('./properties.js');
const unregisteredUsers = require('./unregisteredUsers.js');
const registeredUsers   = require('./registeredUsers.js');

module.exports = {
  administrators   : administrators,
  properties       : properties,
  unregisteredUsers: unregisteredUsers,
  registeredUsers  : registeredUsers,
}
