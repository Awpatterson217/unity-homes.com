'use strict';

const {
  DataModel,
  Basic,
  Address,
} = require('../common');
const { 
  safeNum,
  safeStr,
  safeBool,
} = require('../../safe');

const Application = function() {
/**
 * Inherit from DataModel
 */
  DataModel.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from Basic.
 */
  Basic.call(this);
/**
 * Inherit properties street, city,
 * state, and zip from Address.
 */
  Address.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.collection = 'application';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.uniqueVal = 'email';
/**
 * Properties unique to this model
 */
  this.dob = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.ssn = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.propertyId = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.street = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.city = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.state = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.zip = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.timeLived = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.landlordFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.landlordLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.landlordPhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousStreet = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousCity = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousState = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousZip = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousTimeLived = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousLandlordFirstName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousLandlordLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousLandlordPhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.monthlyIncome = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.employer = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.employerPhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.employerStreet = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.employerCity = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.employerState = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.employerZip = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.position = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.timeWorked = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.supervisorFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.supervisorLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousEmployer = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousEmployerPhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousEmployerStreet = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousEmployerCity = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousEmployerState = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousEmployerZip = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousPosition = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousTimeWorked = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.previousSupervisorFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.previousSupervisorLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstRoommateFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstRoommateLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstRelationship = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondRoommateFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondRoommateLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondRelationship = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.thirdRoommateFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.thirdRoommateLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.thirdRelationship = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.fourthRoommateFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.fourthRoommateLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.fourthRelationship = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstPetName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstPetGender = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstPetBreed = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstPetWeight = {
    value   : '',
    required: false,
    safe    : num => safeNum(num) 
  }
  this.firstPetAge = {
    value   : '',
    required: false,
    safe    : num => safeNum(num) 
  }
  this.firstPetSpayed = {
    value   : '',
    required: false,
    safe    : bool => safeBool(bool)
  }
  this.secondPetName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondPetGender = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondPetBreed = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondPetWeight = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.secondPetAge = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.secondPetSpayed = {
    value   : '',
    required: false,
    safe    : bool => safeBool(bool)
  }
  this.firstReferenceFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstReferenceLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstReferenceRel = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.firstReferenceYears = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.firstReferencePhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)

  }
  this.secondReferenceFName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondReferenceLName = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondReferenceRel = {
    value   : '',
    required: false,
    safe    : str => safeStr(str)
  }
  this.secondReferenceYears = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
  this.secondReferencePhone = {
    value   : '',
    required: false,
    safe    : num => safeNum(num)
  }
}

module.exports = Application;
