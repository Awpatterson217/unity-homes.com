"use strict";

const path    = require('path');
const fs      = require('fs');
const express = require('express');

let property    = require('../models/property/property');
let {getImages} = require('../resources/js/functions');

const router = express.Router();

router.get('/properties/all', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

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
    return res.send(JSON.stringify(props, null, 5));
  }).catch( error => {
    // LOG/HANDLE ERROR
    console.log(error);
    return res.send('500');
  });
});

router.post('/properties/all', function(req, res, next) {

});

module.exports = router;
