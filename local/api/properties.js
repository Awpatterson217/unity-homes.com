"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let property    = require('../models/property/property');
let {getImages} = require('../resources/js/functions');

const router = express.Router();

router.get('/properties', function(req, res) {
  //return res.render('apply');
});

router.post('/properties', function(req, res, next) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  
  //return res.render('apply');

});

let getProps = async function(fullName, callback){
  try{
    let properties = await property.all();

    for(let i = 0; i < properties.length; i++){
      let theseImages = await getImages(properties[i].id);
      properties[i].images = theseImages;
    }

    return callback(null, properties);
  }catch(error){
    return callback(error);
  }
}

module.exports = router;
