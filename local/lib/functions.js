'use strict';

const path = require('path');
const fs   = require('fs');
const exec = require('child_process').exec;

const log = console.log;

const execute = (cmd) => {
  exec(cmd, (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    if (err) {
      log('exec error: ' + err);
    }
  });
}

const isEmpty = (...params) => {
  if (!prams.length) {
    console.log('isEmpty() - no params!');

    return true;
  }

  return params.some(param => param === '');
}

const imageMatcher = (item, id) => {
  let parsedItem;
  parsedItem = path.parse(item);
  parsedItem = parsedItem.name;
  parsedItem = parsedItem.split('-', 1);

  return (
    parsedItem[0] === id
  );
}

const getImages = (id) => {
  const pathToImages = path.join(
    process.cwd(),
    'public',
    'resources',
    'images',
    'properties'
  );

  return new Promise((resolve, reject) => {
    fs.readdir(pathToImages, (err, items) => {
      if (err) {
        reject(err);
      }

      resolve(items.filter(item => imageMatcher(item, id)));
    });
  });
}

module.exports = {
  isEmpty,
  getImages,
  execute,
  log,
  sep: path.sep,
};
