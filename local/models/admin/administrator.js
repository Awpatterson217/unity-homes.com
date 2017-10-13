"use strict";

const bcrypt = require('bcryptjs');

const {_create}   = require('../../api/create');
const {_delete}   = require('../../api/delete');
const {_count}    = require('../../api/read');
const {_find}     = require('../../api/read');
const {_all}      = require('../../api/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

let administrator = {
  email: {
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
  type: {
    value: 'admin',
  },  
  password: {
    value: '',
  },
  timestamp: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  authenticate: async function(email, password, callback){
    let thisEmail    = safeEmail(email);
    let thisPassword = safePass(password);

    if(!thisEmail.safe)
      return callback(customErr('Invalid Email'));

    if(!thisPassword.safe)
      return callback(customErr('Invalid Password'));

      try{
        let user = await _find('registeredUsers', {'email': thisEmail.val});

        if(!user)
          return callback(customErr('Invalid Email'));

        let validPW = await bcrypt.compare(thisPassword.val, user.password);

        if(!validPW)
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

    safeValue = administrator[key].safe(val);

    if(safeValue.safe){
      administrator[key].value = safeValue.val;

      return true;
    }

    return false;
  },
  hash: async function(password){
      let safePassword = safePass(password);
      
      if(safePassword.safe){
        try{
           let salt = await bcrypt.genSalt(13);

           let hash = await bcrypt.hash(safePassword.val, salt);

           administrator.password.value = hash;
        } catch(err) {
          // TODO: Handle error
          console.log(err);
        }

        return true;
      }

      return false;
  },
  getObject: function(){
    let object = {}
    let keys   = [];

    Object.keys(administrator).forEach(function(val, i, arr){
      if(typeof administrator[val] !== 'function')
        keys.push(val);
    });

    for(let i = 0; i < keys.length; i++){
      object[keys[i]] = administrator[keys[i]].value;
    }

    return object;
  },
  create: function(callback){
    _count('registeredUsers', {
      'email': administrator.email.value
    }, function(error, count) {
      if(error !== null)
        return callback(newErr(error));

      if(!count){
        _create('registeredUsers', administrator.getObject(), function(error, user) {
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
    _delete('registeredUsers', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  },
  all: async function(){
    const users = await _all('registeredUsers').then(function(users) {
      return users;
    }, function(error) {
        return callback(newErr(error));
    });
      
    return users;
  },
  find: async function(filter, callback){
    if (filter === undefined)
      filter = registeredTenant.getObject();

    try{
      let user = await _find('registeredUsers', filter);

      if(!user)
        return callback(customErr('Nothing Found'));

      return callback(null, user);
    } catch(err) {
      // TODO: Handle error
      console.log(err);
    }
  }
}

module.exports = administrator;
