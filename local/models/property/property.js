"use strict";

const {_create}   = require('../../api/create');
const {_delete}   = require('../../api/delete');
const {_count}    = require('../../api/read');
const {_find}     = require('../../api/read');
const {_all}      = require('../../api/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

let property = {
  id: {
    value: '',
  },
  mainImage: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  type: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  street: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  },
  city: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  state: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  zip: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  stories: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  rent: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  occupied: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  occupants: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  },
  sqft: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  washer: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  dryer: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  garage: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  basement: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  fence: {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  },
  images: {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  },
  timestamp: {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  },
  setVal: function(key, val){
    let safeValue;

    if(typeof key !== 'string')
      return false;

    if(typeof val !== 'string')
      return false;

    safeValue = property[key].safe(val);

    if(safeValue.safe){
      property[key].value = safeValue.val;
      
      return true;
    }

    return false;
  },
  getObject: function(){
    let object = {}
    let keys   = [];

    Object.keys(property).forEach(function(val, i, arr){
      if(typeof property[val] !== 'function')
        keys.push(val);
    });

    for(let i = 0; i < keys.length - 1; i++){
      object[keys[i]] = property[keys[i]].value;
    }

    return object;
  },
  create: function(callback){
    _count('properties', {
      'street': property.street.value
    }, function(error, count) {

      if(error !== null)
        return callback(newErr(error));

      if(!count){
        let newStreet = ''
        let copiedStreet = property.street.value;
        for(let i = 0; i < copiedStreet.length; i++) {
          if(copiedStreet[i] === ' ')
            continue;
          newStreet += copiedStreet[i];
        }
        property.id.value = newStreet.toLowerCase();
        _create('properties', property.getObject(), function(error, prop) {
          if(error !== null)
            return callback(newErr(error));

          return callback(null, prop)
        });
      }else{
        return callback(customErr('Duplicate Property'));
      }
    });
  },
  delete: function(filter, callback){
    _delete('properties', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  },
  all: async function(){
    const props = await _all('properties').then(function(props) {
      return props;
    }, function(error) {
      return callback(newErr(error));
    });
      
    return props;
  },
  find: function(filter, callback){
    if (filter === undefined)
      filter = property.getObject();

    _find('properties', filter, function(error, prop, numFound) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, prop, numFound);
    });
  }
}

module.exports = property;
