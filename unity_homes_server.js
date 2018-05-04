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
const ejs        = require('ejs');

const { checkAuth } = require('./local/node_modules/lib/middleware');

const routes = require('./local/routes');
const APIs   = require('./local/api');

const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser = bodyParser.json();

const ttl = 180;  

const PORT = process.env.UNITY_PORT;
let HOST   = process.env.UNITY_HOST;

let SECRET = process.env.UNITY_SECRET;

if (typeof SECRET !== 'undefined'){
  SECRET = SECRET.trim();
} else {
  console.log("SECRET is undefined");
}
if (typeof HOST !== 'undefined') {
  HOST = HOST.trim();
} else {
  console.log("HOST is undefined");
}

const client       = redis.createClient();
const redisOptions = {
  client,
  ttl
}

client.on("error", function(err) {
  // TODO: LOG
  console.log("Error " + err);
});

const app = express();

const limiter = require('express-limiter')(app, client);
// Limit requests to 150 per hour per IP
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
    store : new RedisStore(redisOptions),
    secret: SECRET,
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
// Default error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});

app.use(function(req, res, next){
  res.status(404).render('error', { url: req.originalUrl });
});

app.listen(PORT, HOST);

//        TODO

// New mongodb ip, URI from private file
// Linter and tests
// Finish implementing CSRF
// Nodemailer
// Contact API
// Stripe
// SSL / TSL
// Logging
// Favicon
// NGINX as a truted proxy? difference? see: proxy-addr
// need first time login set password prompt
