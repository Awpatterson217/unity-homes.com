const express = require('express');

const {checkTenantAuth} = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/bills', checkTenantAuth, function (req, res) {
  const now = new Date().getTime();
  // TODO Log time and req
  const fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('bills', {
    fullName
  });
});

module.exports = router;