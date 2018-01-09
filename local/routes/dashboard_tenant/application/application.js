const express = require('express');

const {checkTenantAuth} = require('../../../resources/js/middleware');

const router = express.Router();

router.get('/application', checkTenantAuth, function (req, res) {
  const now = new Date().getTime();
  // TODO Log time and req
  const fullName = req.session.firstName + ' ' + req.session.lastName;

  return res.render('application', {
    fullName
  });
});

module.exports = router;