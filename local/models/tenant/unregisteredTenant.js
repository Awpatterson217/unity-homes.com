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

const UnregisteredTenant = function(){
  this.email = {
    value: '',
    safe : function(email){
      return safeEmail(email);
    }
  }
  this.phone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.firstName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.middleName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.lastName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.code = {
    value: '',
  },
  this.timestamp = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.setVal = function(key, val){
    let safeValue;

    if(typeof key !== 'string')
      return false;

    if(typeof val !== 'string')
      return false;

    safeValue = this[key].safe(val);

    if(safeValue.safe){
      this[key].value = safeValue.val;

      return true;
    }

    return false;
  }
  this.getObject = function(){
    let object = {}
    let keys   = [];

    Object.keys(this).forEach(function(val, i, arr){
      if(typeof this[val] !== 'function')
        keys.push(val);
    }.bind(this));

    for(let i = 0; i < keys.length; i++){
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }
  this.create = function(callback){
    const dataObj = this.getObject();

    _count('unregisteredUsers', {
      'email': this.email.value
    }, function(error, count) {
      if(error !== null)
        return callback(newErr(error));

      if(!count){
        _create('unregisteredUsers', dataObj, function(error, user) {
          if(error !== null)
            return callback(newErr(error));

          return callback(null, user)
        });
      }else{
        return callback(customErr('Duplicate Email'));
      }
    });
  }
  this.delete = function(filter, callback){
    _delete('unregisteredUsers', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  }
  this.all = async function(){
    const users = await _all('unregisteredUsers').then(function(users) {
      return users;
    }, function(error) {
        return newErr(error);
    });
      
    return users;
  }
  this.find = async function(filter, callback){
    if (filter === undefined)
      filter = this.getObject();

    try{
      let user = await _find('unregisteredUsers', filter);

      if(!user)
        return callback(customErr('Nothing Found'));

      return callback(null, user);
    } catch(err) {
      // TODO: Handle error
      console.log(err);
    }
  }
}

module.exports = UnregisteredTenant;
