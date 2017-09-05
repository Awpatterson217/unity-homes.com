"use strict";

module.exports = function(app) {
 app.get('/home', function(req, res) {
   res.render('index');
 });
 app.get('/properties', function(req, res) {
   res.render('properties');
 });
 app.get('/pay', function(req, res) {
    res.render('pay');
  });
  app.get('/contact', function(req, res) {
    res.render('contact');
  });
};
