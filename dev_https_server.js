"use strict";

const fs         = require('fs');
const path       = require('path');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const session    = require('express-session');
const ejs        = require('ejs');

const app = express();
const sslPort = 3443;

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
}

app.use('/', express.static(__dirname + 'test'));

https.createServer(httpsOptions, app)
  .listen(sslPort, function() {
    console.log(`SERVER RUNNING ON https://localhost:3443`);
  })