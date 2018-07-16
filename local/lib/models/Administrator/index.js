"use strict";

const {
  DataModel,
  Basic,
} = require('../common');

const Administrator = function() {
/**
 * Inherit from DataModel
 */
  DataModel.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from Basic.
 */
  Basic.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'administrator';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = 'email';
/**
 * Properties unique to this model
 * would go below
 */
}

module.exports = Administrator;
