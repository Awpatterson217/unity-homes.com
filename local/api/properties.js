"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

const Property      = require('../models/property/Property');
const {getImages}   = require('../resources/js/functions');
const {checkProps}  = require('../resources/js/middleware');
const {checkPropId} = require('../resources/js/middleware');
const {isEmpty}     = require('../resources/js/functions');
const {checkAuth}   = require('../resources/js/middleware');

const router = express.Router();

router.get('/properties/read', checkAuth, function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  const property = new Property();

  property.all()
  .then( props => {
    for(let i = 0; i < props.length; i++){
      getImages(props[i].id).then( images => {
        props[i].images = images;
      }).catch( error => {
        // LOG/HANDLE ERROR
        console.log(error);
        return res.send('500');
      });
    }
    return res.type('application/json').status(200).send(JSON.stringify(props, null, 5));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.status(500).send('Something went wrong!');
  });
});

router.get('/property/read', checkAuth, function(req, res) {
  const property = new Property();
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/property/create', checkAuth, checkProps, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const property = new Property();

  let washer   = isEmpty(req.body.washer)
    ? 'false' 
    : 'true';
  let dryer    = isEmpty(req.body.dryer)
    ? 'false' 
    : 'true';
  let garage   = isEmpty(req.body.garage)
    ? 'false' 
    : 'true';
  let basement = isEmpty(req.body.basement)
    ? 'false' 
    : 'true';
  let fence    = isEmpty(req.body.fence)
    ? 'false' 
    : 'true';
  let occupied = isEmpty(req.body.occupied)
    ? 'false' 
    : 'true';

  if(isEmpty(req.body.street))
    return res.status(500).send('Something went wrong!');

  property.setVal('street'   , req.body.street);
  property.setVal('mainImage', req.body.mainImage);
  property.setVal('city'     , req.body.city);
  property.setVal('zip'      , req.body.zip);
  property.setVal('state'    , req.body.state);
  property.setVal('type'     , req.body.type);
  property.setVal('sqft'     , req.body.sqft);
  property.setVal('stories'  , req.body.stories);
  property.setVal('washer'   , washer);
  property.setVal('dryer'    , dryer);
  property.setVal('garage'   , garage);
  property.setVal('basement' , basement);
  property.setVal('fence'    , fence);
  property.setVal('occupied' , occupied);
  property.setVal('timestamp', timestamp);

  property.create(function(error, prop){
  const property = new Property();
    
    if(error !== null)
      return res.status(500).send('Something went wrong!');
    
    return res.status(200).send('Success');
  });
});

router.post('/property/update', checkAuth, function(req, res, next) {
  const property = new Property();  
  // TODO
  return res.status(500).send('Something went wrong!');
});

router.post('/property/delete', checkAuth, checkPropId, function(req, res, next) {
  //const fullName = req.session.firstName + ' ' + req.session.lastName;
  const property = new Property();

  const id = req.body.id;
  if(id === '')
    return res.status(500).send('Something went wrong!');

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    console.log('error: ', error);
    console.log('numOfDeletes: ', numOfDeletes);
    if(error !== null)
      return res.status(500).send('Something went wrong!');

    if(!numOfDeletes)
      return res.status(500).send('Something went wrong!');

    return res.status(200).send('Success');
  });
});

module.exports = router;
