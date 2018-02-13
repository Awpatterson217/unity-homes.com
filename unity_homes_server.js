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
// Custom authorization check as middleware,
// I tell express to use this middleware before
// passing any reuests to their designated API route.
const { checkAuth } = require('./local/node_modules/lib/middleware');
// I require all routes and API endpoints from
// the index.js located in /local/routes and /local/api
const routes = require('./local/routes');
const APIs   = require('./local/api');
// Creating the parsing middleware that will
// be used as middleware later in the application.
const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser   = bodyParser.json();
// Length of time to maintain a session.
const ttl = 180;  
// I keep the production Port and Local IP
// secret for security.
// They are the host and port numbers used
// to initializethe server at the bottom of this page.
const PORT = process.env.UNITY_PORT;
let HOST   = process.env.UNITY_HOST;
// This is the secret used to sign the session ID cookie.
// DOCS: https://github.com/expressjs/session#secret
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

// Create a Redis client which will get
// passed to the express-session middleware.
const client       = redis.createClient();
const redisOptions = {
  client,
  ttl
}

client.on("error", function(err) {
  // TODO: LOG
  console.log("Error " + err);
});

// Create an Express app by calling express().
const app = express();
//
//    *Note: You can also create mini express apps
//           by calling the express.router() method, and then passing
//           the router into the main express application as middleware
//           with the app.use() methods. I did this for each route for both the
//           the API, and routes to the views at /local/routes and /local/api.
//
//           Alternatively, you can actually just create another express application
//           and pass that into our main Express app as well.
//

// Pass the Express application and Redis client
// to the express-limiter module.
const limiter = require('express-limiter')(app, client);
// Limit requests to 150 per hour per IP
limiter({
  lookup: ['connection.remoteAddress'],
  total : 150,
  expire: 1000 * 60 * 60
})

// Ejs templates
// All files to be served must
// use the .ejs extension.
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'dist/views'),
  path.join(__dirname, 'dist/dashboard'),
]);

// app.use(my-middleware), means use this middleware for
// all routes that follow. 

// You could also do app.use(my-route, my-middleware),
// in which case the same pricipal applies but for the
// given route only.

// Express basically just places all middleware
// into an array in the order given, and then calls
// the next() method.

// Server side sessions with Redis.
app.use(
  session({
    store : new RedisStore(redisOptions),
    secret: SECRET,
    saveUninitialized: false,
    resave: false
  })
);
// Sessions can be accessed when handling requests like:
// 
//   const my-middleware = function(req, res, next) {
//     const my-variable = req.session.my-variable; 
//   }
//
//   An example of this can be seen at /local/routes/login/index.js  
//
//   *note: You can write your own middleware, just made sure
//          you pass in `next` as a parameter. for example, I have written
//          custom middleware that is located at /local/node_modules/lib/middleware.js

// helmet is a middleware that
// handles most of your common
// security concerns.
// **This must be used first, because
// the order of your route matters.
app.use(helmet());
// Helmet restricts the `X-Powered-By header`,
// for you automatically, but if you only wanted
// to use a subset of helmet you can. 
//
// I explictly called the .hidePoweredBy() method,
// because it makes me feel safe, even though
// it isn't necessary. :)
app.use(helmet.hidePoweredBy());

// For greater security, I am also using NGINX
// as a reverse-proxy, and then passing
// acceptable requests to the express server.

// Include parsing middleware
// for JSON, and URL encoded data
// only.
app.use(urlEncParser); 
app.use(jsonParser); 
// Serve static files from /css, /js, /images, /assets
// Must use express.static for this to work.
app.use('/css'   , express.static(__dirname + '/dist/css'));
app.use('/js'    , express.static(__dirname + '/dist/js'));
app.use('/images', express.static(__dirname + '/dist/media/images'));
app.use('/assets', express.static(__dirname + '/dist/dashboard/assets'));
// Check for authorization for all
// API calls before routed to API.
// Order matters.
app.use('/api', checkAuth);
// Adding API after authorization check
// (imported from /local)
for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}
// Adding front-end routes
// (imported from /local)
for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}
// Default error handler
// This works, because Express will
// recognize that there are four parameters.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});
// Assume 404 since no middleware responded
// This works, because it is the last route added
// to the Express application. Order matters.
app.use(function(req, res, next){
  res.status(404).render('error', { url: req.originalUrl });
});
// Start Express server
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
