var bcrypt = require('bcryptjs');

const {_create}   = require('../../api/create');
const {_delete}   = require('../../api/delete');
const {_count}    = require('../../api/read');
const {_find}     = require('../../api/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');

let registeredTenant = {
  email: {
    value: '',
    f: function(val){
      return safeEmail(val);
    }
  },
  type: {
    value: 'tenant',
  },  
  password: {
    value: '',
  },
  rent: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },
  leaseStart: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },
  leaseEnd: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },      
  pet: {
    value: '',
    f: function(val){
      return safeBool(val);
    }      
  },
  street: {
    value: '',
    f: function(val){
      return safeStr(val);
    }        
  },
  city: {
    value: '',
    f: function(val){
      return safeStr(val);
    }
  },
  state: {
    value: '',
    f: function(val){
      return safeStr(val);
    }
  },
  zip: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },
  phone: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },
  timestamp: {
    value: '',
    f: function(val){
      return safeNum(val);
    }
  },
  authenticate: function(email, password, callback){
    let thisEmail    = safeEmail(email);
    let thisPassword = safePass(password);
    if(!thisEmail.safe)
      return callback({err: true, msg: 'Invalid Email'});
    if(!thisPassword.safe)
      return callback({err: true, msg: 'Invalid Password'});
    _find('registeredUsers', {'email': thisEmail.val}, function(error, user) {
      let hashedPassword = 'hash' + thisPassword.val;
      if(user.password !== hashedPassword)
        return callback({err: true, msg: 'Incorrect Password'});
      return callback(null, user);
    });
  },
  setValue: function(key, value){
    if(typeof value !== 'string')
      return false;  
    if(registeredTenant[key].f(value)){
      registeredTenant[key].value = value;
      return true;
    }
    return false;
  },
  hash: function(password){
      let safePassword = safePass(password);
      if(safePassword.safe){
        registeredTenant.password.value = "hash" + safePassword.val;
        return true;
      }
      return false;
  },
  getObject: function(){
    let object = {}
    let keys = [];
    Object.keys(registeredTenant).forEach(function(val, i, arr){
      if(typeof registeredTenant[val] !== 'function'){
        keys.push(val);
      }
    });
    for(let i = 0; i < keys.length - 1; i++){
      object[keys[i]] = registeredTenant[keys[i]].value;
    }
    return object;
  },
  create: function(callback){
    _count('registeredUsers', {
      'email': registeredTenant.email.value
    }, function(error, count) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      if(!count){
        _create('registeredUsers', registeredTenant.getObject(), function(error, user) {
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
    _delete('registeredUsers', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      return callback(null, numOfDeletes)
    });
  },
  all: function(filter, callback){
    if (filter === undefined) {
      filter = registeredTenant.getObject();
    }
    _all('registeredUsers', filter, function(error, usersArray) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      if(!usersArray.length)
        return callback({err: true, msg: 'Nothing Found'});
      return callback(null, numOfDeletes)
    });
  },
  find: function(filter, callback){
    if (filter === undefined) {
      filter = registeredTenant.getObject();
    }
    _find('registeredUsers', filter, function(error, user, numFound) {
      if(error !== null)
        return callback({err: true, msg: error.msg});
      return callback(null, user, numFound);
    });
  }
}

module.exports = registeredTenant;
