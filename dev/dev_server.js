"use strict";

const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
// const https      = require('https');
// const fs         = require('fs')

const ROOT = path.resolve(__dirname, '..');

const { checkAuth } = require(`${ROOT}/local/lib/middleware`);
const routes        = require(`${ROOT}/local/routes`);
const APIs          = require(`${ROOT}/local/api`);

const sessionTime = 1000000;
const port        = 3000;
const host        = 'localhost';
const secret      = 'pretendSecret';

/**
 * 1st: setup dockerized database + mock data:
 * 'npm run mongodb'
 * 'npm run mongodb:insert'
 * 
 * 2nd: Start application
 *  'npm run dev'
 */

// Local https: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
// const certOptions = {
//   key: fs.readFileSync(path.resolve(`${ROOT}/cert/server.key`)),
//   cert: fs.readFileSync(path.resolve(`${ROOT}/cert/server.crt`))
// }

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
  resave           : true,
  saveUninitialized: false,
  cookie           : {
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
  const url = req.originalUrl;

  console.error(err.stack)

  res.status(404).render('error', { url });
});

app.use(function(req, res, next) {
  const url = req.originalUrl;

  res.status(404).render('error', { url });
});

// const server = https.createServer(certOptions, app).listen(443, host, () => {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log(`Proxy running at http://${host}:${port}`);
//   });

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Proxy running at http://${host}:${port}`);
});
