"use strict";

const {_create}   = require('../../mongodb/create');
const {_delete}   = require('../../mongodb/delete');
const {_count}    = require('../../mongodb/read');
const {_find}     = require('../../mongodb/read');
const {_all}      = require('../../mongodb/read');
const {safeEmail} = require('../../resources/js/safe');
const {safeNum}   = require('../../resources/js/safe');
const {safeBool}  = require('../../resources/js/safe');
const {safeYear}  = require('../../resources/js/safe');
const {safeStr}   = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');
const {newErr}    = require('../../resources/js/error');
const {customErr} = require('../../resources/js/error');

const Application = function(){
  this.id = {
    value: '',
  }
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
  this.dob = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.ssn = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.propertyId = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.street = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.city = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.state = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.zip = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.timeLived = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.landlordFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.landlordLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.landlordPhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.previousStreet = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousCity = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousState = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousZip = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.previousTimeLived = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.previousLandlordFirstName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousLandlordLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousLandlordPhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.monthlyIncome = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.employer = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.employerPhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.employerStreet = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.employerCity = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.employerState = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.employerZip = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.position = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.timeWorked = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.supervisorFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.supervisorLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.previousEmployer = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousEmployerPhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.previousEmployerStreet = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousEmployerCity = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousEmployerState = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousEmployerZip = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.previousPosition = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }
  }
  this.previousTimeWorked = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }
  }
  this.previousSupervisorFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.previousSupervisorLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstRoommateFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstRoommateLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstRelationship = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondRoommateFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondRoommateLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondRelationship = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.thirdRoommateFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.thirdRoommateLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.thirdRelationship = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.fourthRoommateFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.fourthRoommateLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.fourthRelationship = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstPetName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstPetGender = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstPetBreed = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstPetWeight = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.firstPetAge = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.firstPetSpayed = {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  }
  this.secondPetName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondPetGender = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondPetBreed = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondPetWeight = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.secondPetAge = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.secondPetSpayed = {
    value: '',
    safe : function(bool){
      return safeBool(bool);
    }        
  }
  this.firstReferenceFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstReferenceLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstReferenceRel = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.firstReferenceYears = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.firstReferencePhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.secondReferenceFName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondReferenceLName = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondReferenceRel = {
    value: '',
    safe : function(str){
      return safeStr(str);
    }        
  }
  this.secondReferenceYears = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
  this.secondReferencePhone = {
    value: '',
    safe : function(num){
      return safeNum(num);
    }        
  }
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

    for(let i = 0; i < keys.length - 1; i++){
      object[keys[i]] = this[keys[i]].value;
    }

    return object;
  }
  this.create = function(callback){
    const dataObj = this.getObject();

    _count('applications', {
      'email': this.email.value
    }, function(error, count) {

      if(error !== null)
        return callback(newErr(error));

      if(!count){
        _create('applications', dataObj, function(error, user) {
          if(error !== null)
            return callback(newErr(error));

          return callback(null, user)
        });
      }else{
        // Ask user if they want to continue
        // current application
        return callback(customErr('Duplicate Email'));
      }
    });
  }
  this.delete = function(filter, callback){
    _delete('applications', filter, function(error, numOfDeletes) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, numOfDeletes)
    });
  }
  this.all = async function(){
    const props = await _all('applications').then(function(props) {
      return props;
    }, function(error) {
      return callback(newErr(error));
    });
      
    return props;
  }
  this.find = function(filter, callback){
    if (filter === undefined)
      filter = this.getObject();

    _find('applications', filter, function(error, prop, numFound) {
      if(error !== null)
        return callback(newErr(error));

      return callback(null, prop, numFound);
    });
  }
}

module.exports = Property;
