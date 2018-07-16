"use strict";

const { customErr } = require('../error');
const {
  _count,
  _find,
  _all,
  _delete,
  _create
} = require('../crud');
const { 
  safeEmail,
  safeNum,
  safeStr,
} = require('../safe');

// TODO:
// replace typeof checks with fn

function Basic() {
  this.email = {
    value   : '',
    required: true,
    safe    : (email) => {
      return safeEmail(email);
    }
  }
  this.phone = {
    value   : '',
    required: false,
    safe    : (num) => {
      return safeNum(num);
    }
  }
  this.firstName = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.middleName = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
  this.lastName = {
    value   : '',
    required: false,
    safe    : (str) => {
      return safeStr(str);
    }
  }
}

function Address() {
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
}

function DataModel() {
  this.timestamp = {
    value   : '',
    required: false,
  }

  this.setVal = (key, val) => {
    if (typeof key !== 'string') {
      return false;
    }

    if (typeof val !== 'string') {
      return false;
    }

    const safeValue = this[key].safe(val);

    if (safeValue.safe) {
      this[key].value = safeValue.val;
      
      return true;
    }

    return false;
  }

  this.reset = () => {
    const keys = [];

    Object.keys(this).forEach((val) => {
      if (typeof this[val] !== 'function')
        keys.push(val);
    });

    for (let i = 0; i < keys.length - 1; i++) {
      this[keys[i]].value = '';
    }

    return;
  }

  // An object to be inserted into NoSQL DB
  this.getObject = () => {
    const object = {};
    const keys   = [];

    Object.keys(this).forEach((val) => {
      if (typeof this[val] !== 'function')
        keys.push(val);
    });

    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }

  // An object like { value, required }
  this.getFullObject = () => {
    const object = {};
    const keys   = [];

    Object.keys(this).forEach((val) => {
      if (typeof this[val] !== 'function') {
        keys.push(val);
      }
    });

    for (let i = 0; i < keys.length; i++) {
      object[keys[i]] = {
        value:    this[keys[i]].value,
        required: this[keys[i]].required
      };
    }

    return object;
  }

  this.fill = (request, callback) => {
    const dataObj = this.getObject();

    Object.keys(request.body).forEach((key) => {
      if (dataObj.hasOwnProperty(key)) {
        this.setVal(key, request.body[key]);
      }
    });

    const filledObj = this.getObject();
    const fullObj   = this.getFullObject();
    const keys      = Object.keys(fullObj);

    for(let x = 0; x < keys.length; x++) {
      if (fullObj[keys[x]].required) {
        if (fullObj[keys[x]].value === '') {
          this.reset();
          return callback(customErr('Missing Required Value'))
        }
      }
    }

    return callback(null, filledObj);
  }

  this.create = (callback) => {
    this.timestamp.value = Math.round((new Date()).getTime() / 1000);

    const fullObj = this.getFullObject();
    const dataObj = this.getObject();
    const keys    = Object.keys(fullObj);

    for(let x = 0; x < keys.length; x++) {
      if (fullObj[keys[x]].required) {
        if (fullObj[keys[x]].value === '') {
          this.reset();

          return callback(customErr('Missing Required Value'))
        }
      }
    }

    // TODO: better solution than uniqueVal
    const filter = {
      [this.uniqueVal]: this[this.uniqueVal].value
    };

    _count(this.collection, filter, (error, count) => {
      if (error) {
        return callback(newErr(error));
      }

      if (count) {
        return callback(customErr('Duplicate'));
      }

      _create(this.collection, dataObj, (error, admin) => {
        if (error) {
          return callback(newErr(error));
        }

        return callback(null, admin)
      });
    });
  }
  this.delete = (filter, callback) => {
    _delete(this.collection, filter, (error, numOfDeletes) => {
      if (error) {
        return callback(newErr(error));
      }

      return callback(null, numOfDeletes)
    });
  }
  this.all = async () => {
    try{
      const objects = await _all(this.collection);

      return objects;
    } catch(err) {
      // TODO: Handle error
      console.log(err);
      return err;
    }    
  }
  this.find = async (filter) => {
    const thisFilter = filter
      ? filter
      : this.getObject();

    try{
      const obj = await _find(this.collection, thisFilter);

      return obj;
    } catch(err) {
      // TODO: Handle error
      console.log(err);
      return err;
    }
  }
}

module.exports = {
  DataModel,
  Basic,
  Address,
}
