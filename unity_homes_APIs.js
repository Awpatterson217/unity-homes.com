"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');
const helmet     = require('helmet');
//const redis      = require("redis");
const session    = require('express-session');
//const RedisStore = require('connect-redis')(session);

//const client  = redis.createClient();
const app = express();
//const limiter = require('express-limiter')(app, client);

const jsonParser  = bodyParser.json();

// 100 per hour per IP
//limiter({
//  lookup: ['connection.remoteAddress'],
//  total : 100,
//  expire: 1000 * 60 * 60
//})

const port     = 5050;
const host     = '127.0.0.4';
const APIs     = require('./local/api');

const defaultGetOptions = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers : {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
}

app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(jsonParser); 

for(let apiKey in APIs){
  app.use(APIs[apiKey]);
}

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Unity-Homes APIs running at http://${host}:${port}`);
});
