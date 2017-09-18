"use strict";
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const redis      = require("redis");
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');
const csrf       = require('csurf');

const client  = redis.createClient();
const app     = express();
const limiter = require('express-limiter')(app, client);

// Limit requests to 100 per hour per ip address.
limiter({
  lookup: ['connection.remoteAddress'],
  total: 100,
  expire: 1000 * 60 * 60
})

const port    = 3000;
const host    = '127.0.0.4';
const routes  = require('./local/routes');
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
/**
 * Template Engine
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
/**
 * Middleware
 */
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'ssshhhhh',
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
app.use(bodyParser.json({
  strict: true,
  limit: 100
}));
app.use(bodyParser.urlencoded({
  extended: true
})); 
// Static
app.use('/bootstrap', express.static(__dirname + '/public/vendor/bootstrap-4.0.0-alpha.6-dist/'));
app.use('/vue', express.static(__dirname + '/public/vendor/vue/'));
app.use('/jquery', express.static(__dirname + '/public/vendor/jquery/'));
app.use('/css', express.static(__dirname + '/public/resources/css/'));
app.use('/js', express.static(__dirname + '/public/resources/js/'));
app.use('/images', express.static(__dirname + '/public/resources/images/'));

router.use(function (request, response, next) {
 response.locals.csrftoken = request.csrfToken();
 next();
});
// Routes
for(let route in routes){
  app.use(routes[route]);
}
/**
 * Start Server
 */
const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
  