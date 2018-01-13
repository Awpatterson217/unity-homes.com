"use strict";

const bcrypt = require('bcryptjs');

const {_create}   = require('../../mongodb/create');
const {_delete}   = require('../../mongodb/delete');
const {_count}    = require('../../mongodb/read');
const {_find}     = require('../../mongodb/read');
const {_all}      = require('../../mongodb/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

const UnregisteredTenant = function() {
  this.email = {
    value   : '',
    required: true,
    safe    : function(email) {
      return safeEmail(email);
    }
  }
  this.phone = {
    value   : '',
    required: false,
    safe    : function(num) {
      return safeNum(num);
    }
  }
  this.firstName = {
    value   : '',
    required: true,
    safe    : function(str) {
      return safeStr(str);
    }
  }
  this.middleName = {
    value   : '',
    required: false,
    safe    : function(str) {
      return safeStr(str);
    }
  }
  this.lastName = {
    value   : '',
    required: true,
    safe    : function(str) {
      return safeStr(str);
    }
  }
  this.code = {
    value: '',
    required: false
  },
  this.timestamp = {
    value   : '',
    required: true,
    safe    : function(num) {
      return safeNum(num);
    }
  }
  this.setVal = function(key, val) {
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
  this.getObject = function() {
    let object = {};
    let keys   = [];

    Object.keys(this).forEach(function(val, i, arr) {
      if (typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }
  this.getFullObject = function() {
    let object = {};
    let keys   = [];

    Object.keys(this).forEach(function(val, i, arr) {
      if (typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = {
        value:    this[keys[i]].value,
        required: this[keys[i]].required
      };
    }

    return object;
  }
  this.reset = function() {
    let keys   = [];

    Object.keys(this).forEach(function(val, i, arr) {
      if (typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for (let i = 0; i < keys.length - 1; i++) {
      this[keys[i]].value = '';
    }

    return;
  }
  this.create = function(callback) {
    const fullObj = this.getFullObject();
    const dataObj = this.getObject();

    const keys = Object.keys(fullObj);

    for(let x = 0; x < keys.length; x++) {
      if (fullObj[keys[x]].required === true){
        if (fullObj[keys[x]].value === '') {
          this.reset();
          return callback(customErr('Missing Required Value'))
        }
      }
    }

    _count('unregisteredUsers', {
      'email': this.email.value
    }, function(error, count) {
      if (error !== null)
        return callback(newErr(error));

      if (!count) {
        _create('unregisteredUsers', dataObj, function(error) {
          if (error !== null)
            return callback(newErr(error));

          return callback(null, dataObj)
        });
      }else{
        return callback(customErr('Duplicate Email'));
      }
    });
  }
  this.delete = function(filter, callback) {
    _delete('unregisteredUsers', filter, function(error, numOfDeletes) {
      if (error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  }
  this.all = async function() {
    const users = await _all('unregisteredUsers').then(function(users) {
      return users;
    }, function(error) {
        return newErr(error);
    });
      
    return users;
  }
  this.find = async function(filter) {
    if (filter === undefined)
      filter = this.getObject();

    try{
      return await _find('unregisteredUsers', filter);

    } catch(err) {
      // TODO: Handle error
      console.log(err);
      return err;
    }
  }
  this.fill = function(request, callback) {
    const dataObj = this.getObject();

    Object.keys(request.body).forEach( function(key) {
      if (dataObj.hasOwnProperty(key))
        this.setVal(key, request.body[key]);
    }.bind(this));

    this.setVal('timestamp', Math.floor(Date.now() / 1000).toString());

    const filledObj = this.getObject();

    const fullObj = this.getFullObject();

    const keys = Object.keys(fullObj);

    for(let x = 0; x < keys.length; x++) {
      if (fullObj[keys[x]].required === true){
        if (fullObj[keys[x]].value === '') {
          this.reset();
          return callback(customErr('Missing Required Value'))
        }
      }
    }

    return callback(null, filledObj);
  }
}

module.exports = UnregisteredTenant;
