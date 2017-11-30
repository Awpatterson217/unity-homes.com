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

//const client  = redis.createClient();
const app = express();
//const limiter = require('express-limiter')(app, client);
const urlEncParser  = bodyParser.urlencoded({
  extended: false
});
const jsonParser  = bodyParser.json();

// 100 per hour per IP
//limiter({
//  lookup: ['connection.remoteAddress'],
//  total : 100,
//  expire: 1000 * 60 * 60
//})

// Temporary, will read from external file
const secret   = 'temporarySecret';
// In minutes
const sessionT = 300000;
const port     = 3000;
const host     = '127.0.0.4';
const routes   = require('./local/controllers');
const defaultGetOptions = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers : {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
}
const redisOptions = {
  host  : 'localhost',
  port  : 6379,
  //client: client,
  ttl   : 260
}

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'public', 'views'),
  path.join(__dirname, 'public', 'dashboard_admin'),
  path.join(__dirname, 'public', 'dashboard_admin', 'users'),
  path.join(__dirname, 'public', 'dashboard_admin', 'adminUsers'),
  path.join(__dirname, 'public', 'dashboard_admin', 'regUsers'),
  path.join(__dirname, 'public', 'dashboard_admin', 'props'),
  path.join(__dirname, 'public', 'dashboard_admin', 'propImages'),
  path.join(__dirname, 'public', 'dashboard_tenant')
]);

app.use(helmet());
app.use(helmet.hidePoweredBy());

// Temporary sessions
app.use(session({
  secret: secret,
  cookie: {
    unset   : 'destroy',
    sameSite: true,
    maxAge  : sessionT
  }
}))

/*
app.use(
  session({
    store            : new RedisStore(redisOptions),
    secret           : secret,
    saveUninitialized: false,
    resave           : false,
    key              : 'sessionid',
    cookie           : {
      //secure: true,
      httpOnly: true,
      expires : new Date( Date.now() + 60 * 60 * 1000 )
    }
  })
);
*/

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

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});

//        TODO
// Redis sessions / CSRF
// Read 'session secret' from private file
// SSL / TSL
// Billing system
// Logs
// Graphics, design, favicon, etc.
// Grunt.js or Webpack
