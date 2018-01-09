"use strict";

const {_create}   = require('../../mongodb/create');
const {_delete}   = require('../../mongodb/delete');
const {_count}    = require('../../mongodb/read');
const {_find}     = require('../../mongodb/read');
const {_all}      = require('../../mongodb/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safeYear}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

const Property = function () {
  this.id = {
    value   : '',
    required: false
  }
  this.mainImage = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }
  }
  this.type = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }
  }
  this.street = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }        
  }
  this.city = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }
  }
  this.state = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }
  }
  this.zip = {
    value   : '',
    required: false,
    safe    : function (num) {
      return safeNum(num);
    }
  }
  this.stories = {
    value   : '',
    required: false,
    safe    : function (num) {
      return safeNum(num);
    }
  }
  this.rent = {
    value   : '',
    required: false,
    safe    : function (num) {
      return safeNum(num);
    }
  }
  this.occupied = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.occupants = {
    value   : '',
    required: false,
    safe    : function (str) {
      return safeStr(str);
    }
  }
  this.sqft = {
    value   : '',
    required: false,
    safe    : function (num) {
      return safeNum(num);
    }
  }
  this.year = {
    value   : '',
    required: false,
    safe    : function (num) {
      return safeYear(num);
    }
  }
  this.washer = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.dryer = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.garage = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.basement = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.fence = {
    value   : '',
    required: false,
    safe    : function (bool) {
      return safeBool(bool);
    }        
  }
  this.timestamp = {
    value   : '',
    required: true,
    safe    : function (num) {
      return safeNum(num);
    }
  }
  this.setVal = function (key, val) {
    let safeValue;

    if (typeof key !== 'string')
      return false;

    if (typeof val !== 'string')
      return false;

    safeValue = this[key].safe(val);

    if (safeValue.safe) {
      this[key].value = safeValue.val;
      
      return true;
    }

    return false;
  }
  this.getObject = function () {
    let object = {}
    let keys   = [];

    Object.keys(this).forEach(function (val, i, arr) {
      if (typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for (let i = 0; i < keys.length - 1; i++) {
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }
  this.reset = function () {
    let keys   = [];

    Object.keys(this).forEach(function (val, i, arr) {
      if (typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for (let i = 0; i < keys.length - 1; i++) {
      this[keys[i]].value = '';
    }

    return;
  }
  this.create = function (callback) {
    const dataObj = this.getObject();
    
    Object.keys(dataObj).forEach( function (prop) {
      if (prop.required === true)
        if (prop.value === '') {
          this.reset();
          callback(customErr('Missing Required Value'))
        }
    }.bind(this));

    _count('properties', {
      'street': this.street.value
    }, function (error, count) {

      if (error !== null)
        return callback(newErr(error));

      if (!count) {
        let newStreet = ''
        let copiedStreet = this.street.value;
        for (let i = 0; i < copiedStreet.length; i++) {
          if (copiedStreet[i] === ' ')
            continue;
          newStreet += copiedStreet[i];
        }
        this.id.value = newStreet.toLowerCase();
        _create('properties', this.getObject(), function (error, prop) {
          if (error !== null)
            return callback(newErr(error));

          return callback(null, prop)
        });
      }else{
        return callback(customErr('Duplicate Property'));
      }
    }.bind(this));
  }
  this.delete = function (filter, callback) {
    _delete('properties', filter, function (error, numOfDeletes) {
      if (error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  }
  this.all = async function () {
    const props = await _all('properties').then(function (props) {
      return props;
    }, function (error) {
      return callback(newErr(error));
    });
      
    return props;
  }
  this.find = function (filter, callback) {
    if (filter === undefined)
      filter = this.getObject();

    _find('properties', filter, function (error, prop, numFound) {
      if (error !== null)
        return callback(newErr(error));

      return callback(null, prop, numFound);
    });
  }
  this.fill = function (request, callback) {
    const dataObj = this.getObject();

    Object.keys(request.body).forEach( function (key) {
      if (dataObj.hasOwnProperty(key))
        this.setVal(key, request.body[key]);
    }.bind(this));

    this.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    const fullObj = this.getObject();

    Object.keys(fullObj).forEach( function (prop) {
      if (prop.required === true)
        if (prop.value === '') {
          this.reset();
          callback(customErr('Missing Required Value'))
        }
    }.bind(this));

    callback(null, fullObj);
  }
}

module.exports = Property;
