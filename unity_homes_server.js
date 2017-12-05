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

const sessionTime = 3000000;
const port        = 3000;
const host        = '127.0.0.4';

const NODE_ENV = process.env.NODE_ENV.trim();
const SECRET   = process.env.UNITY_SECRET
  ? process.env.UNITY_SECRET.trim()
  : 'temporary';

if(typeof NODE_ENV === 'undefined')
  console.log("UNDEFINED NODE_ENV");
  // LOG / HANDLE ERROR - email?

if(NODE_ENV === 'development'){
  console.log('TRUWE');
  app.use(session({
    secret: SECRET,
    cookie: {
      unset   : 'destroy',
      sameSite: true,
      maxAge  : sessionTime
    }
  }))
}
if(NODE_ENV === 'production'){
  //const client  = redis.createClient();
  //const limiter = require('express-limiter')(app, client);

  //const redisOptions = {
  //  host  : 'localhost',
  //  port  : 6379,
  //  client: client,
  //  ttl   : 260
  //}

  // 100 per hour per IP
  //limiter({
  //  lookup: ['connection.remoteAddress'],
  //  total : 100,
  //  expire: 1000 * 60 * 60
  //})

  //app.use(
  //  session({
  //    store            : new RedisStore(redisOptions),
  //    secret           : secret,
  //    saveUninitialized: false,
  //    resave           : false,
  //    key              : 'sessionid',
  //    cookie           : {
  //      //secure: true,
  //      httpOnly: true,
  //      expires : new Date( Date.now() + 60 * 60 * 1000 )
  //    }
  //  })
  //);
}

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
const server = app.listen(port, host, () => {
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
