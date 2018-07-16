"use strict";

const {
  DataModel,
  Address,
} = require('../common');
const { 
  safeNum,
  safeBool,
  safeStr,
  safeYear,
} = require('../../safe');

const Property = function() {
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
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'property';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = 'street';
/**
 * Properties unique to this model
 */
  this.mainImage = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.type = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.street = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }        
  }
  this.city = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.state = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.zip = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.stories = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.rent = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.occupied = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
  this.occupants = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.sqft = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.year = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeYear(num);
    }
  }
  this.washer = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
  this.dryer = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
  this.garage = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
  this.basement = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
  this.fence = {
    value   : '',
    required: false,
    safe    : (bool) => {
      return safeBool(bool);
    }        
  }
}

module.exports = Property;
