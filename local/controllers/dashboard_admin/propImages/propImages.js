"use strict";

const express    = require('express');
const formidable = require('formidable');

const property       = require('../../../models/property/property');
const {checkEmail}   = require('../../../resources/js/check');

const router = express.Router();

router.get('/propImages', function(req, res) {
  return res.render('propImages');
});

// Need checkStreetAddr, checkImage
router.post('/propImages/upload', function(req, res, next) {

//  const form = new formidable.IncomingForm();
//  form.type = 'multipart';
//  form.multiples = false;
//  form.uploadDir = path.join('__dirname', 'public', 'resources', 'images', 'properties');
//  form.parse(req, function(){
//    let safeImage      = checkImage(req.body.image);
//    let safeStreetAddr = checkStreetAddr(req.body.streetAddr);

//    if(!safeImage.safe)
//      return res.render('regUsers', {
//        uploadSuccess: false
//      });

//    if(!safeStreetAddr.safe)
//     return res.render('regUsers', {
//        uploadSuccess: false
//      });

    // Create ID = streetAddr + num (num = number of images at this address + 1)
    
      // Each property will have an array of its images with the name ID
//    property.setVal('id', req.body.id);

      // WIll save image somwhere with the name ID
//    property.create(function(error, image){
//      if(error !== null)
//        return res.render('regUsers', {
//          uploadSuccess: false
//        });

//      return res.render('regUsers', {
//        uploadSuccess: true,
//      });
//    });
//  });

  const success = false;

  if(!success)
    return res.render('props', {
      uploadSuccess: false
    });
 
});

// Need validation middleware for string
router.post('/propImages/delete', function(req, res, next) {
  //const id = req.body.id;
  const id = '';

  if(id === '')
    return res.render('propImages', {
      deleteSuccess: false
    });

  property.delete({
    'id': id,
  }, function(error, numOfDeletes) {
    if(error !== null)
      return res.render('propImages', {
        deleteSuccess: false
      });

    if(!numOfDeletes)
      return res.render('propImages', {
        deleteSuccess: false
      });

    return res.render('propImages', { 
      deleteSuccess: true
    });
  });
});

module.exports = router;
