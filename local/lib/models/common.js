'use strict';

const {
  isString,
  isFunction
} = require('is-lib');

const {
  customErr
} = require('../error');

const {
  _count,
  _find,
  _all,
  _delete,
  _create
} = require('../crud');

const { 
  safeDictionary
} = require('../safe');

const {
  create,
  keys: getKeys
} = Object;

const {
  log
} = console;

const {
  has
} = Reflect;

const mkTimeStamp = () => {
  return Math.round(
    (new Date()).getTime() / 1000
  );
}

const addProperty = function(name, type, required) {
  this[name] = {
    value: '',
    safe: safeDictionary[type],
    required: !!required
  }
}

function BasicProps() {
  addProperty.call(this, 'email', 'email', true);
  addProperty.call(this, 'phone', 'number', false);
  addProperty.call(this, 'firstName', 'string', false);
  addProperty.call(this, 'middleName', 'string', false);
  addProperty.call(this, 'lastName', 'string', false);
}

function AddressProps() {
  addProperty.call(this, 'street', 'string', false);
  addProperty.call(this, 'city', 'string', false);
  addProperty.call(this, 'state', 'string', false);
  addProperty.call(this, 'zip', 'number', false);
}

function ModelMethods() {
  this.timestamp = {
    value   : '',
    required: false,
  }

  this.setVal = (key, val) => {
    if (!isString(key) || !isString(val)) {
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

    getKeys(this).forEach((val) => {
      if (!isFunction(this[val])) {
        keys.push(val);
      }
    });

    for (let i = 0; i < keys.length - 1; i++) {
      this[keys[i]].value = '';
    }

    return;
  }

  // An object to be inserted into NoSQL DB
  this.getObject = () => {
    const object = create(null);
    const keys   = [];

    getKeys(this).forEach((val) => {
      // Only collect properties
      // not functions.
      if (!isFunction(this[val])) {
        keys.push(val);
      }
    });

    for (let i = 0; i < keys.length; i++) {
      // Assign the property
      // to a new object
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }

  // An object like { value, required }
  this.getFullObject = () => {
    const object = create(null);
    const keys   = [];

    getKeys(this).forEach((val) => {
      if (!isFunction(this[val])) {
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

  this.checkRequired = () => {
    const fullObj = this.getFullObject();
    const keys    = getKeys(fullObj);

    const check = {
      safe: false,
      value: ''
    };

    for(let x = 0; x < keys.length; x++) {
      if (fullObj[keys[x]].required) {
        if (fullObj[keys[x]].value === '') {
          check.value = keys[x];
          return check
        }
      }
    }

    check.safe = true;

    return check;
  }

  // Parses request and returns filled Object
  // to be inserted into collection.
  this.fill = (request, callback) => {
    getKeys(request.body).forEach((key) => {
      if (has(this.getObject(), key)) {
        this.setVal(key, request.body[key]);
      }
    });

    const requiredCheck = this.checkRequired();

    // Make sure all required
    // properties are set.
    if(!requiredCheck.safe) {
      this.reset();

      return callback(
        customErr(`Missing Required Value: ${requiredCheck.value}`,)
      );
    }

    return callback(null, this.getObject());
  }

  this.create = (callback) => {
    this.timestamp.value = mkTimeStamp();

    const dataObj = this.getObject();

    const requiredCheck = this.checkRequired();

    // Make sure all required
    // properties are set.
    if(!requiredCheck.safe) {
      this.reset();

      return callback(
        customErr(`Missing Required Value: ${requiredCheck.value}`,)
      );
    }

    // TODO: better solution than uniqueVal
    // Each model has a unique value, (primary key)
    const filter = {
      [this.getUniqueVal()]: this[this.getUniqueVal()].value
    };

    // Make sure an object with the same
    // unique key doesn't already exist,
    // then insert object into collection.
    _count(this.getCollection(), filter, (error, count) => {
      if (error) {
        return callback(newErr(error));
      }

      if (count) {
        return callback(customErr('Duplicate'));
      }

      _create(this.getCollection(), dataObj, (error, admin) => {
        if (error) {
          return callback(newErr(error));
        }

        return callback(null, admin)
      });
    });
  }
  this.delete = (filter, callback) => {
    _delete(this.getCollection(), filter, (error, numOfDeletes) => {
      if (error) {
        return callback(newErr(error));
      }

      return callback(null, numOfDeletes)
    });
  }
  this.all = async () => {
    try{
      const objects = await _all(this.getCollection());

      return objects;
    } catch(err) {
      // TODO: Handle error
      log(err);
      return err;
    }    
  }
  this.find = async (filter) => {
    const thisFilter = filter
      ? filter
      : this.getObject();

    try{
      const obj = await _find(this.getCollection(), thisFilter);

      return obj;
    } catch(err) {
      // TODO: Handle error
      log(err);
      return err;
    }
  }
}

module.exports = {
  ModelMethods,
  BasicProps,
  AddressProps,
  addProperty,
}
