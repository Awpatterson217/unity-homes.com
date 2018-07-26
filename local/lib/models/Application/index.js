'use strict';

const {
  ModelMethods,
  BasicProps,
  AddressProps,
  addProperty
} = require('../common');

const Application = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Inherit properties firstName, middleName,
 * lastName, email, and phone from BasicProps.
 */
  BasicProps.call(this);
/**
 * Inherit properties street, city,
 * state, and zip from AddressProps.
 */
  AddressProps.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'application';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => 'email';
/**
 * Properties unique to this model
 */
  // + BasicProps()
  addProperty.call(this, 'dob', 'number', false);
  addProperty.call(this, 'ssn', 'number', false);
  addProperty.call(this, 'propertyId', 'number', false);

  // + AddressProps()
  addProperty.call(this, 'timeLived', 'number', false);
  addProperty.call(this, 'landlordFName', 'string', false);
  addProperty.call(this, 'landlordLName', 'string', false);
  addProperty.call(this, 'landlordPhone', 'number', false);

  addProperty.call(this, 'previousStreet', 'string', false);
  addProperty.call(this, 'previousCity', 'string', false);
  addProperty.call(this, 'previousState', 'string', false);
  addProperty.call(this, 'previousZip', 'number', false);
  addProperty.call(this, 'previousTimeLived', 'number', false);
  addProperty.call(this, 'previousLandlordFirstName', 'string', false);
  addProperty.call(this, 'previousLandlordLName', 'string', false);
  addProperty.call(this, 'previousLandlordPhone', 'number', false);

  addProperty.call(this, 'monthlyIncome', 'number', false);

  addProperty.call(this, 'employer', 'string', false);
  addProperty.call(this, 'employerPhone', 'number', false);
  addProperty.call(this, 'employerStreet', 'string', false);
  addProperty.call(this, 'employerCity', 'string', false);
  addProperty.call(this, 'employerState', 'string', false);
  addProperty.call(this, 'employerZip', 'number', false);
  addProperty.call(this, 'position', 'string', false);
  addProperty.call(this, 'timeWorked', 'number', false);
  addProperty.call(this, 'supervisorFName', 'string', false);
  addProperty.call(this, 'supervisorLName', 'string', false);

  addProperty.call(this, 'previousEmployer', 'string', false);
  addProperty.call(this, 'previousEmployerPhone', 'number', false);
  addProperty.call(this, 'previousEmployerStreet', 'string', false);
  addProperty.call(this, 'previousEmployerCity', 'string', false);
  addProperty.call(this, 'previousEmployerState', 'string', false);
  addProperty.call(this, 'previousEmployerZip', 'number', false);
  addProperty.call(this, 'previousPosition', 'string', false);
  addProperty.call(this, 'previousTimeWorked', 'number', false);
  addProperty.call(this, 'previousSupervisorFName', 'string', false);
  addProperty.call(this, 'previousSupervisorLName', 'string', false);

  addProperty.call(this, 'firstRoommateFName', 'string', false);
  addProperty.call(this, 'firstRoommateLName', 'string', false);
  addProperty.call(this, 'firstRelationship', 'string', false);

  addProperty.call(this, 'secondRoommateFName', 'string', false);
  addProperty.call(this, 'secondRoommateLName', 'string', false);
  addProperty.call(this, 'secondRelationship', 'string', false);

  addProperty.call(this, 'thirdRoommateFName', 'string', false);
  addProperty.call(this, 'thirdRoommateLName', 'string', false);
  addProperty.call(this, 'thirdRelationship', 'string', false);

  addProperty.call(this, 'fourthRoommateFName', 'string', false);
  addProperty.call(this, 'fourthRoommateLName', 'string', false);
  addProperty.call(this, 'fourthRelationship', 'string', false);

  addProperty.call(this, 'firstPetName', 'string', false);
  addProperty.call(this, 'firstPetGender', 'string', false);
  addProperty.call(this, 'firstPetBreed', 'string', false);
  addProperty.call(this, 'firstPetWeight', 'number', false);
  addProperty.call(this, 'firstPetAge', 'number', false);
  addProperty.call(this, 'firstPetSpayed', 'boolean', false);

  addProperty.call(this, 'secondPetName', 'string', false);
  addProperty.call(this, 'secondPetGender', 'string', false);
  addProperty.call(this, 'secondPetBreed', 'string', false);
  addProperty.call(this, 'secondPetWeight', 'number', false);
  addProperty.call(this, 'secondPetAge', 'number', false);
  addProperty.call(this, 'secondPetSpayed', 'boolean', false);

  addProperty.call(this, 'firstReferenceFName', 'string', false);
  addProperty.call(this, 'firstReferenceLName', 'string', false);
  addProperty.call(this, 'firstReferenceRel', 'string', false);
  addProperty.call(this, 'firstReferenceYears', 'number', false);
  addProperty.call(this, 'firstReferencePhone', 'number', false);

  addProperty.call(this, 'secondReferenceFName', 'string', false);
  addProperty.call(this, 'secondReferenceLName', 'string', false);
  addProperty.call(this, 'secondReferenceRel', 'string', false);
  addProperty.call(this, 'secondReferenceYears', 'number', false);
  addProperty.call(this, 'secondReferencePhone', 'number', false);
/**
 * Methods unique to this model
 * would go below
 */
}

module.exports = Application;
