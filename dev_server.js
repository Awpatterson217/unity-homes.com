"use strict";

const fs         = require('fs');
const path       = require('path');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
const ejs        = require('ejs');

const routes = require('./local/routes');
const APIs   = require('./local/api');

const { checkAuth } = require('./local/node_modules/lib/middleware');

const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser = bodyParser.json();

const sessionTime = 1000000;
const port        = 3000;
const host        = '127.0.0.4';
const SECRET      = 'pretendSecret';

const app = express();

// Redis sessions for production
app.use(session({
  secret: SECRET,
  cookie: {
    unset   : 'destroy',
    sameSite: true,
    maxAge  : sessionTime,
    resave: true,
    saveUninitialized: false
  }
}));

// Security
app.use(helmet());
app.use(helmet.hidePoweredBy());

// Parsing
app.use(urlEncParser); 
app.use(jsonParser); 

// Static Files
app.use('/', express.static(__dirname + '/dist/'));

// Check for authorization for all api calls
app.use('/api', checkAuth);

// Adding API
for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}

// Adding front-end routes
for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

// Ejs templating
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'dist'),
]);


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});

// Assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('error', { url: req.originalUrl });
});

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
