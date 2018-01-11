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
  path.join(__dirname, 'public', 'dashboard_admin'),
  path.join(__dirname, 'public', 'dashboard_admin', 'data'),
  path.join(__dirname, 'public', 'dashboard_admin', 'users'),
  path.join(__dirname, 'public', 'dashboard_admin', 'adminUsers'),
  path.join(__dirname, 'public', 'dashboard_admin', 'properties'),
  path.join(__dirname, 'public', 'dashboard_admin', 'billing'),
  path.join(__dirname, 'public', 'dashboard_tenant'),
  path.join(__dirname, 'public', 'dashboard_tenant', 'application'),
]);

app.use(helmet());

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

for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}

// TODO Custom error handling and logs
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
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
// babel and Webpack
// NGINX as a truted proxy? difference? see: proxy-addr
// need first time login set password prompt
// Better input sanitation middleware?