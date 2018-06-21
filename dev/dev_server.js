"use strict";

const path       = require('path');
// const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');

const ROOT = path.resolve(__dirname, '..');

const { checkAuth } = require(`${ROOT}/local/node_modules/lib/middleware`);
const routes        = require(`${ROOT}/local/routes`);
const APIs          = require(`${ROOT}/local/api`);

const sessionTime    = 1000000;
const port           = 3000;
const host           = 'localhost';
const secret         = 'pretendSecret';
// const STRIPE_DEV_KEY = process.env.STRIPE_DEV_KEY;
const STRIPE_DEV_KEY = '';

const jsonParser   = bodyParser.json();
const urlEncParser = bodyParser.urlencoded({
  extended: false
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', [
  path.join(ROOT, 'dist/views'),
  path.join(ROOT, 'dist/dashboard'),
]);

app.use(session({
  secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    unset   : 'destroy',
    sameSite: true,
    maxAge  : sessionTime,
  }
}));

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(urlEncParser); 
app.use(jsonParser); 
app.use('/css'   , express.static(ROOT + '/dist/css'));
app.use('/js'    , express.static(ROOT + '/dist/js'));
app.use('/images', express.static(ROOT + '/dist/media/images'));
app.use('/assets', express.static(ROOT + '/dist/dashboard/assets'));

app.use('/api', checkAuth);

for (let apiKey in APIs) {
  app.use('/api', APIs[apiKey]);
}
for (let routeKeys in routes) {
  app.use(routes[routeKeys]);
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('error', { url: req.originalUrl });
});

app.use(function(req, res, next) {
  res.status(404).render('error', { url: req.originalUrl });
});

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Proxy running at http://${host}:${port}`);
});
