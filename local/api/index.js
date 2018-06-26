"use strict";

const administrator = require('./administrator');
const property      = require('./property');
const tenant        = require('./tenant');
const application   = require('./application');
const billing       = require('./billing');

module.exports = {
  administrator,
  property,
  tenant,
  application,
  billing
};
