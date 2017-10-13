"use strict";

const express = require('express');
const moment  = require('moment');

const router = express.Router();

router.get('/logout', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();
  return res.redirect('/home');

/*
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
          res.redirect('/home');
      }
    });
*/

});

module.exports = router;
