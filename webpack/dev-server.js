"use strict"

const path      = require('path');
const webpack   = require('webpack');
const DevServer = require('webpack-dev-server');
const config    = require('./webpack/webpack.dev.config.js');

const compiler = webpack(config);
const server = new DevServer(compiler, {
  contentBase: path.join(__dirname, "target/dist"),
  stats: {
    colors: true,
  },
});

server.listen(3000, '127.0.0.4', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server running at http://${host}:${port}`);
});
