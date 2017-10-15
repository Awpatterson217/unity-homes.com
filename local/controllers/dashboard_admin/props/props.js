"use strict";

const express = require('express');

const property      = require('../../../models/property/property');
const {checkProps}  = require('../../../resources/js/middleware');
const {checkPropId} = require('../../../resources/js/middleware');
const {isEmpty}     = require('../../../resources/js/functions');
const {checkAuth}   = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/props', checkAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req

  let fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('props', {
    fullName: fullName
  });
});

router.post('/props/add', checkAuth, checkProps, function(req, res, next) {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  let fullName = req.session.firstName + ' ' + req.session.lastName;

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
    return res.render('props', {
      fullName     : fullName,
      createSuccess: false
    });

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
    if(error !== null)
      return res.render('props', {
        fullName     : fullName,
        createSuccess: false
      });
    
    return res.render('props', {
      fullName     : fullName,
      createSuccess: true,
    });
  });
});

router.post('/props/delete', checkAuth, checkPropId, function(req, res, next) {
  let fullName = req.session.firstName + ' ' + req.session.lastName;

  const id = req.body.id;

  if(id === '')
    return res.render('props', {
      fullName     : fullName,
      deleteSuccess: false
    });

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('props', {
        fullName     : fullName,
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('props', {
        fullName     : fullName,
        deleteSuccess: false
      });

    return res.render('props', {
      fullName     : fullName,
      deleteSuccess: true
    });
  });
});

module.exports = router;
