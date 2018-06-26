"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
// const https      = require('https');
// const fs         = require('fs');

const { checkAuth } = require('./local/node_modules/lib/middleware');
const routes        = require('./local/routes');
const APIs          = require('./local/api');

const jsonParser   = bodyParser.json();
const urlEncParser = bodyParser.urlencoded({
  extended: false
});

const TTL            = process.env.UNITY_TTL;
const PORT           = process.env.UNITY_PORT;
const STRIPE_API_KEY = process.env.UNITY_STRIPE_API_KEY
const STRIPE_DEV_KEY = process.env.UNITY_STRIPE_DEV_KEY

const HOST = process.env.UNITY_HOST
  ? process.env.UNITY_HOST.trim()
  : null;

const SECRET = process.env.UNITY_SECRET
  ? process.env.UNITY_SECRET.trim()
  : null;

if (!SECRET) {
  console.log("SECRET is undefined");
}
if (!HOST) {
  console.log("HOST is undefined");
}

const app          = express();
const client       = redis.createClient();
const redisOptions = {
  client,
  ttl: TTL
};

client.on("error", function(err) {
  console.log("Error " + err);
});

const limiter = require('express-limiter')(app, client);

limiter({
  lookup: ['connection.remoteAddress'],
  total : 150,
  expire: 1000 * 60 * 60
})

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'dist/views'),
  path.join(__dirname, 'dist/dashboard'),
]);

app.use(
  session({
    secret           : SECRET,
    store            : new RedisStore(redisOptions),
    saveUninitialized: false,
    resave           : false
  })
);

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(urlEncParser); 
app.use(jsonParser); 
app.use('/css'   , express.static(__dirname + '/dist/css'));
app.use('/js'    , express.static(__dirname + '/dist/js'));
app.use('/images', express.static(__dirname + '/dist/media/images'));
app.use('/assets', express.static(__dirname + '/dist/dashboard/assets'));

app.use('/api', checkAuth);

for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}
for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

app.use(function (err, req, res, next) {
  const url = req.originalUrl;

  console.error(err.stack)

  res.status(404).render('error', { url });
});

app.use(function(req, res, next) {
  const url = req.originalUrl;

  res.status(404).render('error', { url });
});

app.listen(PORT, HOST);

//        TODO:
// Refactor leftover callback model methods
// MongoDB URI and Stripe key in private env vars
// fix hot reloading for dashboard

// Form to add properties
// UI for property details

// UI for viewing tenant details

// UI for viewing applications

// UI for viewing billing details

// Tenant side Billing System

// Settings model and api (back-end)
// Nodemailer api (and model?)

// Modals for confirmations (deletes, paying bills, etc.)

// CSRF
// Nodemailer
// Contact API
// SSL / TSL
// Logging
// Favicon
// NGINX as a trusted proxy? difference? see: proxy-addr
// need first time login set password prompt
