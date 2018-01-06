"use strict";

const fs         = require('fs');
const path       = require('path');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
const ejs        = require('ejs');

const app = express();

const routes = require('./local/routes');
const APIs   = require('./local/api');

const sessionTime = 1000000;
const port        = 3000;
const host        = '127.0.0.4';

let SECRET = 'developmentSecret';

app.use(session({
  secret: SECRET,
  cookie: {
    unset   : 'destroy',
    sameSite: true,
    maxAge  : sessionTime
  }
}));

/**
 * Parsing
 */
const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser = bodyParser.json();

/**
 * Views
 */
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'public', 'views'),
  path.join(__dirname, 'public', 'dashboard_admin'),
  path.join(__dirname, 'public', 'dashboard_admin', 'data'),
  path.join(__dirname, 'public', 'dashboard_admin', 'users'),
  path.join(__dirname, 'public', 'dashboard_admin', 'adminUsers'),
  path.join(__dirname, 'public', 'dashboard_admin', 'properties'),
  path.join(__dirname, 'public', 'dashboard_admin', 'billing'),
  path.join(__dirname, 'public', 'dashboard_tenant'),
  path.join(__dirname, 'public', 'dashboard_tenant', 'application'),
]);

/**
 * Middleware
 */
app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(urlEncParser); 
app.use(jsonParser); 

app.use('/bootstrap', express.static(__dirname + '/public/vendor/bootstrap-4.0.0-alpha.6-dist/'));
app.use('/jquery'   , express.static(__dirname + '/public/vendor/jquery/'));
app.use('/angularjs', express.static(__dirname + '/public/vendor/angularjs/'));
app.use('/css'      , express.static(__dirname + '/public/resources/css/'));
app.use('/js'       , express.static(__dirname + '/public/resources/js/'));
app.use('/js'       , express.static(__dirname + '/public/resources/js/ngAdmin'));
app.use('/js'       , express.static(__dirname + '/public/resources/js/ngTenant'));
app.use('/images'   , express.static(__dirname + '/public/resources/images/'));

for(let routeKeys in routes){
  app.use(routes[routeKeys]);
}
for(let apiKey in APIs){
  app.use('/api', APIs[apiKey]);
}

/**
 * Server
 */
const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
