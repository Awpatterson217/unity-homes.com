"use strict";

const express = require('express');

const property = require('../../../models/property/property');

const router = express.Router();

router.get('/props', function(req, res) {
  return res.render('props');
});

// Need checkStreetAddr, checkImage
router.post('/props/add', function(req, res, next) {


  // Create ID = streetAddr + num (num = number of images at this address + 1)
  
    // Each property will have an array of its images with the name ID
//    property.setVal('id', req.body.id);

//    property.create(function(error, image){
//      if(error !== null)
//        return res.render('regUsers', {
//          uploadSuccess: false
//        });

//      return res.render('regUsers', {
//        uploadSuccess: true,
//      });
//    });

  const success = false;

  if(!success)
    return res.render('props', {
      createSuccess: false
    });
 
});

// Need validation middleware for string
router.post('/props/delete', function(req, res, next) {
  //const id = req.body.id;
  const id = '';

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
