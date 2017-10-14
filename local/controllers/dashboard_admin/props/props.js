"use strict";

const express = require('express');

const property      = require('../../../models/property/property');
const {checkProps}  = require('../../../resources/js/check');
const {checkPropId} = require('../../../resources/js/check');
const {notEmpty}    = require('../../../resources/js/sanitize');

const router = express.Router();

router.get('/props', function(req, res) {
  return res.render('props');
});

router.post('/props/add', checkProps, function(req, res, next) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  let washer   = notEmpty(req.body.washer)
    ? 'true' 
    : 'false';
  let dryer    = notEmpty(req.body.dryer)
    ? 'true' 
    : 'false';
  let garage   = notEmpty(req.body.garage)
    ? 'true' 
    : 'false';
  let basement = notEmpty(req.body.basement)
    ? 'true' 
    : 'false';
  let fence    = notEmpty(req.body.fence)
    ? 'true' 
    : 'false';
  let occupied = notEmpty(req.body.occupied)
    ? 'true' 
    : 'false';

  if(!notEmpty(req.body.street))
    return res.render('props', {
      createSuccess: false
    });

    // Create id = streetAddr + num (num = number of images at this address + 1)
    // property.setVal('id', id);

  property.setVal('street'   , req.body.street);
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
        createSuccess: false
      });
    
    return res.render('props', {
      createSuccess: true,
    });
  });
});

router.post('/props/delete', checkPropId, function(req, res, next) {
  const id = req.body.id;

  if(id === '')
    return res.render('props', {
      deleteSuccess: false
    });

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('props', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('props', {
        deleteSuccess: false
      });

    return res.render('props', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
