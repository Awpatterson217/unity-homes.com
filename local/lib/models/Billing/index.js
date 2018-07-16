"use strict";

const { DataModel } = require('../common');
const { 
  safeEmail,
} = require('../../safe');

const Billing = function() {
/**
 * Inherit from DataModel
 */
DataModel.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'billing';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = ''; // TODO: id or email + date combo
/**
 * Properties unique to this model
 */
  this.email = {
    value   : '',
    required: true,
    safe    : (email) => {
      return safeEmail(email);
    }
  }
}

module.exports = Billing;
