"use strict";

const {_create}   = require('../../mongodb/create');
const {_delete}   = require('../../mongodb/delete');
const {_count}    = require('../../mongodb/read');
const {_find}     = require('../../mongodb/read');
const {_all}      = require('../../mongodb/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safeCode}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

let unregisteredTenant = {
  email: {
    value: '',
    safe : function(email){
      return safeEmail(email);
    }
  },
  phone: {
    value: '',
    safe : function(email){
      return safeEmail(email);
    }
  },
  firstName: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  middleName: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  lastName: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  code: {
    value: '',
  },
  timestamp: {
    value: '',
    safe : function(str){
      return safeNum(str);
    }
  },
  authenticate: async function(email, code, callback){
    let thisEmail = safeEmail(email);
    let thisCode  = safeCode(code);

    if(!thisEmail.safe)
      return callback(customErr('Invalid Email'));

    if(!thisCode.safe)
      return callback(customErr('Invalid Code'));

      try{
        let user = await _find('unregisteredUsers', {
          'email': thisEmail.val,
          'code' : thisCode.val
        });

        if(!user)
          return callback(customErr('Invalid Email'));

        return callback(null, user);
      } catch(err) {
        // TODO: Handle error
        console.log(err);
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
