"use strict";

const {
  DataModel,
  Basic,
  Address,
} = require('../common');
const { 
  safeNum,
  safeBool,
  safeStr,
} = require('../../safe');

const Tenant = function() {
/**
 * Decorates this function
 */
  DataModel.call(this);
/**
 * Inherit properties street, city,
 * state, and zip from Address.
 */
  Address.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from Basic.
 */
  Basic.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'tenant';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = 'email';
/**
 * Properties unique to this model
 */
  this.rent = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.leaseStart = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.leaseEnd = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }   
  this.pet = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }      
  }
  this.code = {
    value: '',
    required: false
  }
  this.isRegistered = {
    value: '',
    required: true,
    safe    : (str) => {
      return safeStr(str);
    }
  }
}

module.exports = Tenant;
