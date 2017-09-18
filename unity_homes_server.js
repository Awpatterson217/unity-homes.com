"use strict";
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const helmet     = require('helmet');
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const ejs        = require('ejs');
/**
 * Initializations
 */
const port    = 3000;
const host    = '127.0.0.4';
const app     = express();
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
  port: 6379,
  ttl: 900
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
app.use(
  session({
    store: new RedisStore(redisOptions),
    secret: 'some secret',
    cookie: {secure: true}
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
  