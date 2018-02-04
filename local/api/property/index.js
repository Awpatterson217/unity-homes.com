"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');
const csrf    = require('csurf');

const Property               = require('models/Property');
const { getImages, isEmpty } = require('lib/functions');
const {
  checkProps,
  checkId,
  checkAdminAuth
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be admin for all API calls
router.all('/property', checkAdminAuth, function(req, res, next) {
  next();
});

// Get all properties
router.get('/property', function(req, res) {
  const property = new Property();

  property.all()
  .then( props => {
    for (let i = 0; i < props.length; i++) {
      getImages(props[i].id).then( images => {
        props[i].images = images;
      }).catch( error => {
        // LOG/HANDLE ERROR
        console.log(error);
        return res.status(500).send(error);
      });
    }
    return res.type('application/json').status(200).send(JSON.stringify(props, null, 5));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
      return res.status(500).send(error);
  });
});

// Get a property by id
router.get('/property/:id', function(req, res) {
  const property = new Property();
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Create a property
router.post('/property', checkProps, function(req, res, next) {
  const property = new Property();

  req.body.washer   = isEmpty(req.body.washer)
    ? 'false' 
    : 'true';
  req.body.dryer    = isEmpty(req.body.dryer)
    ? 'false' 
    : 'true';
  req.body.garage   = isEmpty(req.body.garage)
    ? 'false' 
    : 'true';
  req.body.basement = isEmpty(req.body.basement)
    ? 'false' 
    : 'true';
  req.body.fence    = isEmpty(req.body.fence)
    ? 'false' 
    : 'true';
  req.body.occupied = isEmpty(req.body.occupied)
    ? 'false' 
    : 'true';

  property.fill(req, function(error, dataObj) {
    if (error !== null)
      return res.status(500).send(error);
  });

  property.create(function(error, prop) {    
    if (error !== null)
      return res.status(500).send(error);
    
    return res.status(200).send('Success');
  });
});

// Update a property by id
router.put('/property/:id', function(req, res, next) {
  const property = new Property();  
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a property by id
router.delete('/property/:id', checkId, function(req, res, next) {
  const property = new Property();

  const id = req.body.id;

  if (id === '')
    return res.status(500).send('Empty Property Identifier!');

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    if (error !== null)
      return res.status(500).send(error);

    if (!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
