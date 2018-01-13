"use strict";

const bcrypt = require('bcryptjs');
// const stripe = require('stripe')('sk_test_...');

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

/*
const customer = await stripe.customers.create(
  { email: 'customer@example.com' }
);


// Create a new customer and then a new charge for that customer:
stripe.customers.create({
  email: 'foo-customer@example.com'
}).then(function(customer) {
  return stripe.customers.createSource(customer.id, {
    source: 'tok_visa'
  });
}).then(function(source) {
  return stripe.charges.create({
    amount: 1600,
    currency: 'usd',
    customer: source.customer
  });
}).then(function(charge) {
  // New charge created on a new customer
}).catch(function(err) {
  // Deal with an error
});
*/
const Billing = function() {
  this.email = {
    value   : '',
    required: true,
    safe    : function(email) {
      return safeEmail(email);
    }
  }
  this.firstName = {
    value   : '',
    required: false,
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
    required: false,
    safe    : function(str) {
      return safeStr(str);
    }
  } 
  this.street = {
    value   : '',
    required: false,
    safe    : function(str) {
      return safeStr(str);
    }        
  }
  this.city = {
    value   : '',
    required: false,
    safe    : function(str) {
      return safeStr(str);
    }
  }
  this.state = {
    value   : '',
    required: false,
    safe    : function(str) {
      return safeStr(str);
    }
  }
  this.zip = {
    value   : '',
    required: false,
    safe    : function(num) {
      return safeNum(num);
    }
  }
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
    let object = {}
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

    _count('billing', {
      'email': this.email.value
    }, function(error, count) {
      if (error !== null)
        return callback(newErr(error));

      if (!count) {
        _create('billing', dataObj, function(error, user) {
          if (error !== null)
            return callback(newErr(error));

          return callback(null, user)
        });
      }else{
        return callback(customErr('Duplicate Email'));
      }
    });
  }
  this.delete = function(filter, callback) {
    _delete('billing', filter, function(error, numOfDeletes) {
      if (error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  }
  this.all = async function(callback) {
    const users = await _all('billing').then(function(users) {
      return users;
    }, function(error) {
        return newErr(error);
    });
      
    return users;
  }
  this.find = async function(filter, callback) {
    if (filter === undefined)
      filter = this.getObject();

    try{
      let user = await _find('billing', filter);

      if (!user)
        return callback(customErr('Nothing Found'));

      return callback(null, user);
    } catch(err) {
      // TODO: Handle error
      return callback(err);
      console.log(err);
    }
  }
}

module.exports = Billing;
