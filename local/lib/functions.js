"use strict";

const path = require('path');
const fs   = require('fs');
const exec = require('child_process').exec;

const Tenant   = require('./models/Tenant');
const Property = require('./models/Property');

const log = console.log;

const execute = (cmd) => {
  exec(cmd, (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    if (err !== null) {
      log('exec error: ' + err);
    }
  });
}

const isEmpty = (...str) => {
  let params = [...str];
  let empty  = false;

  params.forEach((val) => {
    if (val === '') {
      empty = true;
    }
  });

  if (empty) {
    return true;
  }

  return false;  
}

const propdata = async () => {
  const property = new Property();

  const data = {};
  try{
    const properties = await property.all();

    for (let i = 0; i < properties.length; i++) {
      properties[i].images = [];
      const theseImages = await getImages(properties[i].id);
      properties[i].images.concat(theseImages);
    }

    data.properties = properties;

    return callback(null, data);
  }catch(error) {
    return callback(error);
  }
}

const adminData = async (fullName, callback) => {
  const tenant    = new Tenant();
  const property  = new Property();

  try{
    const tenants    = await tenant.all();
    const properties = await property.all();

    for (let i = 0; i < properties.length; i++) {
      const theseImages = await getImages(properties[i].id);
      properties[i].images = theseImages;
    }

    const data = {
      tenants,
      properties
    };

    return callback(null, data);
    console.log(data);
  }catch(error) {
    console.log(error);
    return callback(error);
  }
}

const imageMatcher = (item, id) => {
  let parsedItem;
  parsedItem = path.parse(item);
  parsedItem = parsedItem.name;
  parsedItem = parsedItem.split('-', 1);
  return (parsedItem[0] === id);
}

const getImages = (id) => {
  let pathToImages;
  pathToImages = path.join('public', 'resources', 'images', 'properties');
  pathToImages = path.join(process.cwd(), pathToImages);

  return new Promise((resolve, reject) => {
    let allImages;
    fs.readdir(pathToImages, (err, items) => {
      if (err !== null)
        reject(err);
      allImages = items.filter(item => imageMatcher(item, id));
      resolve(allImages);
    });
  });
}

module.exports = {
  isEmpty,
  getImages,
  adminData,
  propdata,
  execute,
  log,
  sep: path.sep,
};
