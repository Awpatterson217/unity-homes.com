"use strict";

const {_create}   = require('../../api/create');
const {_delete}   = require('../../api/delete');
const {_count}    = require('../../api/read');
const {_find}     = require('../../api/read');
const {_all}      = require('../../api/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

let unregisteredTenant = {
  email: {
    value: '',
    safe: function(email){
      return safeEmail(email);
    }
  },
  code: {
    value: '',
  },
  timestamp: {
    value: '',
    safe: function(str){
      return safeNum(str);
    }
  },
  setVal: function(key, val){
    let safeValue;

    if(typeof key !== 'string')
      return false;
    if(typeof val !== 'string')
      return false;

    safeValue = unregisteredTenant[key].safe(val);
    
    if(safeValue.safe){
      unregisteredTenant[key].value = safeValue.val;
      return true;
    }

    return false;
  },
  getObject: function(){
    let object = {}
    let keys   = [];

    Object.keys(unregisteredTenant).forEach(function(val, i, arr){
      if(typeof unregisteredTenant[val] !== 'function'){
        keys.push(val);
      }
    });

    for(let i = 0; i < keys.length; i++){
      object[keys[i]] = unregisteredTenant[keys[i]].value;
    }

    return object;
  },
  create: function(callback){
    _count('unregisteredUsers', {
      'email': unregisteredTenant.email.value
    }, function(error, count) {
      if(error !== null)
        return callback(newErr(error));

      if(!count){
        unregisteredTenant.code.value = Math.floor(Math.random() * 10000000000).toString();
        _create('unregisteredUsers', unregisteredTenant.getObject(), function(error, user) {
          if(error !== null)
            return callback(newErr(error));

          return callback(null, user)
        });
      }else{
        return callback(customErr('Duplicate Email'));
      }
    });
  },
  delete: function(filter, callback){
    _delete('unregisteredUsers', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  },
  all: async function(){
    const users = await _all('unregisteredUsers').then(function(users) {
      return users;
    }, function(error) {
        return callback(newErr(error));
      });
      
    return users;
  },
  find: function(filter, callback){
    _find('unregisteredUsers', filter, function(error, user, numFound) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, user, numFound);
    });
  },
}

module.exports = unregisteredTenant;
