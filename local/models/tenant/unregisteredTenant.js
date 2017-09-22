const {_create}   = require('../../api/create');
const {_delete}   = require('../../api/delete');
const {_count}    = require('../../api/read');
const {_find}     = require('../../api/read');
const {_all}      = require('../../api/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');

let unregisteredTenant = {
  email: {
    value: '',
    f: function(email){
      return safeEmail(email);
    }
  },
  code: {
    value: '',
    f: function(code){
      return safeNum(code);
    }
  },
  timestamp: {
    value: '',
    f: function(num){
      return safeNum(num);
    }
  },
  setValue: function(key, value){
    if(typeof value !== 'string')
      return false;  
    if(unregisteredTenant[key].f(value)){
      unregisteredTenant[key].value = value;
      return true;
    }
    return false;
  },
  getObject: function(){
    let object = {}
    let keys = [];
    Object.keys(unregisteredTenant).forEach(function(val, i, arr){
      if(typeof unregisteredTenant[val] !== 'function'){
        keys.push(val);
      }
    });
    for(let i = 0; i < keys.length - 1; i++){
      object[keys[i]] = unregisteredTenant[keys[i]].value;
    }
    return object;
  },
  create: function(callback){   
    _count('unregisteredUsers', {
      'email': unregisteredTenant.email.value
    }, function(error, count) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      if(!count){
        _create('unregisteredUsers', unregisteredTenant.getObject(), function(error, user) {
          if(error !== null)
            return callback({err: true, msg: error.msg});
          return callback(null, user)
        });
      }else{
        return callback({err: true, msg: 'Dupicate Email'});
      }
    });
  },
  delete: function(filter, callback){
    _delete('unregisteredUsers', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      return callback(null, numOfDeletes)
    });
  },
  all: async function(callback){
    _all('unregisteredUsers', function(error, users) {
      if(error !== null)
        return Promise.reject(error.msg);
      if(!users.length)
        return Promise.reject('Nothing Found');
      return Promise.resolve(users);
    });
  },
  find: function(filter, callback){
    _find('unregisteredUsers', filter, function(error, user, numFound) {
      if(error !== null && error.err)
        return callback({err: true, msg: error.msg});
      return callback(null, user, numFound);
    });
  },
}

module.exports = unregisteredTenant;
