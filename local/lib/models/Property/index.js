'use strict';

const {
  ModelMethods,
  AddressProps,
  addProperty,
} = require('../common');

const Property = function() {
/**
 * Inherit from ModelMethods
 */
  ModelMethods.call(this);
/**
 * Inherit properties street, city,
 * state, and zip from AddressProps.
 */
  AddressProps.call(this);
/**
 * Name of collection
 * to be stored in DB
 */
  this.getCollection = () => 'property';
/**
 * A unique property to use
 * when checking for duplicates
 */
  this.getUniqueVal = () => 'street';
/**
 * Properties unique to this model
 */
  addProperty.call(this, 'mainImage', 'string', false);
  addProperty.call(this, 'type', 'string', false);
  addProperty.call(this, 'stories', 'number', false);
  addProperty.call(this, 'rent', 'number', false);
  addProperty.call(this, 'occupied', 'boolean', false);
  addProperty.call(this, 'occupants', 'number', false);
  addProperty.call(this, 'sqft', 'number', false);
  addProperty.call(this, 'year', 'year', false);
  addProperty.call(this, 'washer', 'boolean', false);
  addProperty.call(this, 'dryer', 'boolean', false);
  addProperty.call(this, 'garage', 'boolean', false);
  addProperty.call(this, 'basement', 'boolean', false);
  addProperty.call(this, 'fence', 'boolean', false);
/**
 * Methods unique to this model
 * would go below
 */
}

module.exports = Property;
