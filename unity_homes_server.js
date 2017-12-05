"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');

const app = express();

const routes = require('./local/routes');
const APIs   = require('./local/api');

const ttl = 260;

let PORT   = process.env.UNITY_PORT;
let HOST   = process.env.UNITY_HOST;
let SECRET = process.env.UNITY_SECRET;

if(typeof SECRET !== 'undefined')
  SECRET = SECRET.trim();
else
  console.log("SECRET is undefined");

if(typeof HOST !== 'undefined')
  HOST = HOST.trim();
else
  console.log("HOST is undefined");

/**
 * Storing sessions with redis
 */
const client = redis.createClient();

const redisOptions = {
  client,
  ttl
}

client.on("error", function (err) {
  console.log("Error " + err);
});

app.use(
  session({
    store : new RedisStore(redisOptions),
    secret: SECRET,
    saveUninitialized: false,
    resave: false
  })
);

/**
 * Rate limiter
 */
const limiter = require('express-limiter')(app, client);

// 150 per hour per IP
limiter({
  lookup: ['connection.remoteAddress'],
  total : 150,
  expire: 1000 * 60 * 60
})

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
  path.join(__dirname, 'public', 'dashboard_tenant')
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
const server = app.listen(PORT, HOST, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});

//        TODO
// Redis sessions / CSRF - NEEDS TESTED
// SSL / TSL
// Billing system
// Logs
// Graphics, design, favicon, etc.
// babel and Webpack
// NGINX as a truted proxy? difference? see: proxy-addr
