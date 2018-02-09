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

const app = express();

const routes = require('./local/routes');
const APIs   = require('./local/api');

const ttl     = 180;  // Seconds
const sslPort = 3443; // Temporary

// const httpsOptions = {
  // cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  // key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
// }

let PORT   = process.env.UNITY_PORT;
let HOST   = process.env.UNITY_HOST;
let SECRET = process.env.UNITY_SECRET;

if (typeof SECRET !== 'undefined')
  SECRET = SECRET.trim();
else
  console.log("SECRET is undefined"); // TODO: LOG

if (typeof HOST !== 'undefined')
  HOST = HOST.trim();
else
  console.log("HOST is undefined"); // TODO: LOG

const client = redis.createClient();
const redisOptions = {
  client,
  ttl
}

client.on("error", function(err) {
  console.log("Error " + err); // TODO: LOG
});

app.use(
  session({
    store : new RedisStore(redisOptions),
    secret: SECRET,
    saveUninitialized: false,
    resave: false
  })
);

const limiter = require('express-limiter')(app, client);
// 150 per hour per IP
limiter({
  lookup: ['connection.remoteAddress'],
  total : 150,
  expire: 1000 * 60 * 60
})

const urlEncParser = bodyParser.urlencoded({
  extended: false
});
const jsonParser = bodyParser.json();

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'public', 'views'),
  path.join(__dirname, 'public', 'dashboard'),
  path.join(__dirname, 'public', 'dashboard', 'dist'),
]);

app.use(helmet());

app.use(urlEncParser); 
app.use(jsonParser); 

app.use('/bootstrap/4', express.static(__dirname + '/public/vendor/bootstrap-4.0.0/'));
app.use('/bootstrap/3', express.static(__dirname + '/public/vendor/bootstrap-3.3.7/'));
app.use('/jquery'     , express.static(__dirname + '/public/vendor/jquery/'));
app.use('/angularjs'  , express.static(__dirname + '/public/vendor/angularjs/'));
app.use('/css'        , express.static(__dirname + '/public/resources/css/'));
app.use('/js'         , express.static(__dirname + '/public/resources/js/'));
app.use('/images'     , express.static(__dirname + '/public/resources/images/'));

for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

// Check for authorization for all api calls
app.use('/api', checkAuth);

for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}

// TODO Custom error handling and logs
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', {
    url: req.hostname + req.originalUrl,
  });
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('error', {
    url: req.hostname + req.originalUrl,
    });
});

const server = app.listen(PORT, HOST, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});

// https.createServer(httpsOptions, app)
//   .listen(sslPort, function() {
//     console.log(`SERVER RUNNING ON https://localhost:3443`);
//   })

//        TODO

// Make new mongodb ip, Read ip from private file

// Need linter and unit tests
// Finish CSRF
// Nodemailer
// Contact API
// Stripe
// SSL / TSL
// - cert
// - proxy
// Logs
// Favicon
// Webpack
// LESS
// NGINX as a truted proxy? difference? see: proxy-addr
// need first time login set password prompt
// Better input sanitation middleware?