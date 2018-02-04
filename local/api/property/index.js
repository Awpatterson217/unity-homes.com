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
  checkAdminAuth,
  checkIdParam,
  } = require('lib/middleware');

const router = express.Router();

// Add as middleware
const csrfProtection = csrf()
// Use template engine to pass token
// res.render('send', { csrfToken: req.csrfToken() })
// <input type="hidden" name="_csrf" value="{{csrfToken}}">

// Must be admin for all API calls
router.use('/property', checkAdminAuth)

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
      if (props.length)
        return res.type('application/json').status(200).send(JSON.stringify(props, null, 5));

      return res.status(404).render('error', {
        url: req.hostname + req.originalUrl,
      });
    }).catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
        return res.status(500).send(error);
    });
});

// Get a property by id
router.get('/property/:id', checkIdParam, function(req, res) {
  const property = new Property();

  console.log('id: ', req.params.id);

  const id = req.params.id;

  property.find({ id })
    .then((prop) => {
      return res.type('application/json')
        .status(200)
        .send(JSON.stringify(prop, null, 2));
    })
    .catch( error => {
      // LOG/HANDLE ERROR
      console.log(error);
      return res.status(500).send(error);
    });
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
router.put('/property/:id', checkIdParam, function(req, res, next) {
  const property = new Property();
  console.log('id: ', req.params.id);
  // TODO
  return res.status(500).send('Something went wrong!');
});

// Delete a property by id
router.delete('/property/:id', checkIdParam, function(req, res, next) {
  const property = new Property();

  const id = req.params.id;

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
