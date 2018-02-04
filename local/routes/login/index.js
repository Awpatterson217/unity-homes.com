"use strict";

const express = require('express');

const Tenant                    = require('models/Tenant');
const { checkEmail, checkPass } = require('lib/middleware');
const { isEmpty }               = require('lib/functions');

const router = express.Router();

router.get('/login', function(req, res) {
  return res.render('login');
});
  
router.post('/login', checkEmail, checkPass, function(req, res, next) {
  let time;
  const NOW = new Date().getTime();
  const tenant = new Tenant();

  const email    = req.body.email;
  const password = req.body.password;
  const year     = 365 * 24 * 60 * 60 * 1000;
  
  if (req.body.remember)
    res.cookie('remember', email, { maxAge: year });

  if (isEmpty(email, password))
    return res.render('login', { invalid: true });

  tenant.authenticate(email, password, function(error, tenant) {
    if (error !== null)
      return res.render('login', {
        invalid: true
      });

    req.session.firstName = tenant.firstName;
    req.session.lastName  = tenant.lastName;
    req.session.type      = tenant.type;
    req.session.userAuth  = true;

    if (tenant.type === 'admin')
      return res.redirect('/dashboard/admin');
    if (tenant.type === 'tenant')
      return res.redirect('/dashboard/tenant');
  });
});

/*
res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
*/
// TODO CSRF

// handle csrf errors specifically
//router.use(function(err, req, res, next) {
//    if (err.code !== 'EBADCSRFTOKEN') return next(err);
//    res.status(403).send("ERROR: session has expired or been tampered with");
//});

module.exports = router;
