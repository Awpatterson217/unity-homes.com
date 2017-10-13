"use strict";

const express = require('express');
const moment  = require('moment');

const router = express.Router();

router.get('/tenant', function(req, res) {
  let time; // TODO Log time and req
  const NOW = new Date().getTime();

  if(!req.session.userAuth){
    let responseText = '<h1>No Access!</h1>';
    responseText += '<hr>';
    responseText += '<br /> You may need to login again.';

    return res.send(responseText);
  }

  let firstName = req.session.firstName;
  let lastName  = req.session.lastName;

  let fullName = firstName + ' ' + lastName;

  res.render('tenant', {
    fullName: fullName,
    time    : moment(NOW).format('LLL')
  });
  
});

module.exports = router;
