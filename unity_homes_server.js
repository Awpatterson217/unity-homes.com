"use strict";

const express    = require('express');
const https      = require('https');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);

const { checkAuth } = require('./local/node_modules/lib/middleware');
const routes        = require('./local/routes');
const APIs          = require('./local/api');

const jsonParser   = bodyParser.json();
const urlEncParser = bodyParser.urlencoded({
  extended: false
});

const TTL  = 180;
const PORT = process.env.UNITY_PORT;
// const STRIPE_DEV_KEY = process.env.UNITY_STRIPE_DEV_KEY

let host   = process.env.UNITY_HOST;
let secret = process.env.UNITY_SECRET;

if (secret) {
  secret = secret.trim();
} else {
  console.log("SECRET is undefined");
}
if (host) {
  host = host.trim();
} else {
  console.log("HOST is undefined");
}

const app          = express();
const client       = redis.createClient();
const redisOptions = {
  client,
  ttl: TTL
};

client.on("error", function(err) {
  // TODO: LOG
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
    secret,
    store : new RedisStore(redisOptions),
    saveUninitialized: false,
    resave: false
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
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});

app.use(function(req, res, next) {
  res.status(404).render('error', { url: req.originalUrl });
});

app.listen(PORT, host);

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
