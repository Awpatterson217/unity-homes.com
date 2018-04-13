"use strict";

const fs         = require('fs');
const path       = require('path');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
const ejs        = require('ejs');

const root = path.resolve(__dirname, '..');

const routes = require(`${root}/local/routes`);
const APIs   = require(`${root}/local/api`);

const { checkAuth } = require(`${root}/local/node_modules/lib/middleware`);

const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser  = bodyParser.json();
const sessionTime = 1000000;
const port        = 3000;
const host        = 'localhost';
const SECRET      = 'pretendSecret';

const app = express();

app.set('view engine', 'ejs');
app.set('views', [
  path.join(root, 'dist/views'),
  path.join(root, 'dist/dashboard'),
]);

app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    unset   : 'destroy',
    sameSite: true,
    maxAge  : sessionTime,
  }
}));

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(urlEncParser); 
app.use(jsonParser); 
app.use('/css'   , express.static(root + '/dist/css'));
app.use('/js'    , express.static(root + '/dist/js'));
app.use('/images', express.static(root + '/dist/media/images'));
app.use('/assets', express.static(root + '/dist/dashboard/assets'));
app.use('/api', checkAuth);

for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}

for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});

app.use(function(req, res, next){
  res.status(404).render('error', { url: req.originalUrl });
});

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Proxy running at http://${host}:${port}`);
});
