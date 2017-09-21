"use strict";
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');

/*
let registeredTenant = require('./local/models/tenant/registeredTenant');
registeredTenant.setValue('email', 'tenant@unity-homes.com');
registeredTenant.hash('Password1');
registeredTenant.setValue('rent', '1100');
registeredTenant.setValue('timestamp', Math.floor(Date.now() / 1000).toString());

registeredTenant.create(function(error, numOfInserts){
  if(error !== null)
    console.log(error.msg);
  console.log(numOfInserts + ' users successfully inserted.');
});

registeredTenant.authenticate('tenant@unity-homes.com', 'Password1', function(error, user){
  if(error !== null)
    console.log(error.msg);
    console.log(user);
});
*/

const client  = redis.createClient();
const app     = express();
const limiter = require('express-limiter')(app, client);
const parser  = bodyParser.urlencoded({
  extended: false
});

// 100 per hour per IP
limiter({
  lookup: ['connection.remoteAddress'],
  total: 100,
  expire: 1000 * 60 * 60
})

const port    = 3000;
const host    = '127.0.0.4';
const routes  = require('./local/controllers');
const defaultGetOptions = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
}
const redisOptions = {
  host: 'localhost',
  port: 6379,
  client: client,
  ttl: 260
}

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'public', 'views'),
  path.join(__dirname, 'public', 'dashboard_admin'),
  path.join(__dirname, 'public', 'dashboard_admin', 'unregUsers'),
  path.join(__dirname, 'public', 'dashboard_admin', 'regUsers'),
  path.join(__dirname, 'public', 'dashboard_tenant')
]);

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    key: 'sessionid',
    cookie: {
      //secure: true,
      httpOnly: true,
      expires: new Date( Date.now() + 60 * 60 * 1000 )
    }
  })
);

app.use(parser); 

app.use('/bootstrap', express.static(__dirname + '/public/vendor/bootstrap-4.0.0-alpha.6-dist/'));
app.use('/vue', express.static(__dirname + '/public/vendor/vue/'));
app.use('/jquery', express.static(__dirname + '/public/vendor/jquery/'));
app.use('/css', express.static(__dirname + '/public/resources/css/'));
app.use('/js', express.static(__dirname + '/public/resources/js/'));
app.use('/images', express.static(__dirname + '/public/resources/images/'));

for(let route in routes){
  app.use(routes[route]);
}

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});

//        TODO
// bcrypt.js (passwords)
// Redis sessions / CSRF
// Read 'session secret' from private file
// SSL / TSL
// Better input validation
// API for applicants
// API for properties
// Vue.js dashboard app
// Billing system
// Logs
// Graphics, design, favicon, etc.
// Grunt.js or Webpack
// Refactor code / tweek performance
// Break it