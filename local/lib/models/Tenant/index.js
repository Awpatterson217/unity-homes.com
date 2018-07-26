'use strict';

const {
  ModelMethods,
  BasicProps,
  AddressProps,
  addProperty,
} = require('../common');

const Tenant = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Inherit properties street, city,
 * state, and zip from AddressProps.
 */
  AddressProps.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from BasicProps.
 */
  BasicProps.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'tenant';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => 'email';
/**
 * Properties unique to this model
 */
  addProperty.call(this, 'rent', 'number', false);
  addProperty.call(this, 'leaseStart', 'number', false);
  addProperty.call(this, 'leaseEnd', 'number', false);
  addProperty.call(this, 'pet', 'boolean', false);
  addProperty.call(this, 'isRegistered', 'string', true);
  this.code = {
    value: '',
    required: false
  }
/**
 * Methods unique to this model
 * would go below
 */
}

module.exports = Tenant;
