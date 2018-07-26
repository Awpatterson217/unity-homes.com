'use strict';

const {
  ModelMethods,
  BasicProps,
} = require('../common');

const Administrator = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from BasicProps.
 */
  BasicProps.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'administrator';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => 'email';
/**
 * Properties unique to this model
 * would go below
 */
/**
 * Methods unique to this model
 * would go below
 */
}

module.exports = Administrator;
