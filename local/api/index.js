"use strict";

const administrator = require('./administrator');
const property      = require('./property');
const applicant     = require('./applicant');
const tenant        = require('./tenant');
const application   = require('./application');
const billing       = require('./billing');

module.exports = {
  administrator,
  property,
  applicant,
  tenant,
  application,
  billing
};
