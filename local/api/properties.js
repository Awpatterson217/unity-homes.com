"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

const Property     = require('../models/property/Property');
const {getImages}  = require('../resources/js/functions');
const {checkProps} = require('../resources/js/middleware');
const {checkId}    = require('../resources/js/middleware');
const {isEmpty}    = require('../resources/js/functions');
const {checkAuth}  = require('../resources/js/middleware');

const router = express.Router();

router.get('/properties/read', checkAuth, function(req, res) {
  const property = new Property();

  property.all()
  .then( props => {
    for(let i = 0; i < props.length; i++){
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

router.get('/property/read', checkAuth, function(req, res) {
  const property = new Property();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/property/create', checkAuth, checkProps, function(req, res, next) {
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
    if(error !== null)
      return res.status(500).send(error);
  });

  property.create(function(error, prop){    
    if(error !== null)
      return res.status(500).send(error);
    
    return res.status(200).send('Success');
  });
});

router.post('/property/update', checkAuth, function(req, res, next) {
  const property = new Property();  
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/property/delete', checkAuth, checkId, function(req, res, next) {
  const property = new Property();

  const id = req.body.id;

  if(id === '')
    return res.status(500).send('Something went wrong!');

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.status(500).send(error);

    if(!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
