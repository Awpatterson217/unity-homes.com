"use strict";

const express = require('express');

const { checkAdminAuth } = require('lib/middleware');

const router = express.Router();

router.get('/dashboard/admin/properties', checkAdminAuth, function(req, res) {
  const now = new Date().getTime();
  // TODO Log time and req
  const fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('admin/properties', {
    fullName: fullName
  });
});

module.exports = router;
