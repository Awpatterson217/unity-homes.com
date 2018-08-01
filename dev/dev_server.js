'use strict';

const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');

const ROOT = path.resolve(__dirname, '..');

const {
  checkAuth,
} = require(`${ROOT}/local/lib/middleware`);

const routes = require(`${ROOT}/local/routes`);
const APIs   = require(`${ROOT}/local/api`);

// MONGODB

const {
  initMongoDB,
  getMongoDB,
} = require(`${ROOT}/local/mongoDB`)

const DB = process.env.UNITY_MONGO_DB;

initMongoDB(DB, (error, connection) => {
  if (error) {
    console.log('error: ', error);
  }

  console.log('isConnected: ', connection.isConnected());

  process.on('SIGINT', () => {
    mongoDB.closeConnection(() => {
      process.exit(0);
    });
  });

  const mongoDB = getMongoDB()
  // mongoDB.closeConnection();
});

// END MONGODB

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

app.use((err, req, res, next) => {
  const { originalUrl: url } = req;

  console.error(err.stack)

  res.status(404).render('error', { url });
});

app.use((req, res, next) => {
  const { originalUrl: url } = req;

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
