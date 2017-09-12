"use strict";

module.exports = function(app) {
 app.get('/home', function(req, res) {
   res.render('index');
 });
 app.get('/properties', function(req, res) {
   res.render('properties');
 });
 app.get('/app', function(req, res) {
    res.render('app');
  });
  app.get('/contact', function(req, res) {
    res.render('contact');
  });
  app.get('/register', function(req, res) {
    res.render('register');
  });
  app.get('/login', function(req, res) {
    res.render('login');
  });
};
