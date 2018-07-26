'use strict';

const {
  ModelMethods,
  addProperty,
} = require('../common');

const Billing = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'billing';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => ''; // TODO: id or email + date combo
/**
 * Properties unique to this model
 */
  addProperty.call(this, 'email', 'email', true);
/**
 * Methods unique to this model
 * would go below
 */
}

module.exports = Billing;
