"use strict";

const fs         = require('fs');
const path       = require('path');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
const ejs        = require('ejs');

// I require all routes and API endpoints from
// the index.js located in /local/routes and /local/api
const routes = require('./local/routes');
const APIs   = require('./local/api');
// Custom authorization check as middleware,
// I tell express to use this middleware before
// passing any reuests to their designated API route.
const { checkAuth } = require('./local/node_modules/lib/middleware');
// Creating the parsing middleware that will
// be used as middleware later in the application.
const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser = bodyParser.json();
// The length of time before a session expires
const sessionTime = 1000000;
// These values are hidden in production,
// but they are the host and port numbers used
// to initializethe server at the bottom of this page.
const port        = 3000;
const host        = '127.0.0.4';
// In production, this shouldn't
// be publicly visible.
// This is the secret used to sign the session ID cookie.
// DOCS: https://github.com/expressjs/session#secret
const SECRET      = 'pretendSecret';

// Create an Express app by
// calling express().
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

// Cookie sessions for development.
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
// For production, I am using a NoSQL DB (Redis).
// Server side sessions are more secure than cookies.
// The only reason I would store sessions using
// cookies in production would be for cross domain 
// compatibility.
//
//    *note: I do (or will) use cookies for CSRF protection.
//           Basically, everytime the user requests a page
//           which contains a form, I send a randomly generated
//           string and store it as a hidden input field.
//           I will not accept the forms submission if the randomly
//           string was not what I expect. This helps protect
//           from cross-site scripting attacks. 
//


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
const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Proxy running at http://${host}:${port}`);
});
