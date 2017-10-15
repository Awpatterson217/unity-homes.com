"use strict";

const path = require('path');
const fs   = require('fs');

let property           = require('../../models/property/property');
let registeredTenant   = require('../../models/tenant/registeredTenant');
let unregisteredTenant = require('../../models/tenant/unregisteredTenant');

let isEmpty = function(...str){
  let params = [...str];
  let empty  = false;

  params.forEach(function(val, index, array){
    if(val === '')
      empty = true;
  });
  if(empty)
    return true;
  return false;  
}

let propdata = async function(){
  let data = {};
  try{
    let properties = await property.all();

    for(let i = 0; i < properties.length; i++){
      properties[i].images = [];
      let theseImages = await getImages(properties[i].id);
      properties[i].images.concat(theseImages);
    }

    data.properties = properties;

    return callback(null, data);
  }catch(error){
    return callback(error);
  }
}

let adminData = async function(fullName, callback){
  let data = {};
  try{
    let unregisteredTenants = await unregisteredTenant.all();
    let registeredTenants   = await registeredTenant.all();
    let properties          = await property.all();

    for(let i = 0; i < properties.length; i++){
      let theseImages = await getImages(properties[i].id);
      properties[i].images = theseImages;
    }

    data.unregisteredTenants = unregisteredTenants;
    data.registeredTenants   = registeredTenants;
    data.properties          = properties;

    return callback(null, data);
  }catch(error){
    return callback(error);
  }
}

let imageMatcher = function(item, id){
  let parsedItem;
  parsedItem = path.parse(item);
  parsedItem = parsedItem.name;
  parsedItem = parsedItem.split('-', 1);
  return (parsedItem[0] === id);
}

let getImages = function(id){
  let pathToImages;
  pathToImages = path.join('public', 'resources', 'images', 'properties');
  pathToImages = path.join(process.cwd(), pathToImages);

  return new Promise((resolve, reject) => {
    let allImages;
    fs.readdir(pathToImages, (err, items) => {
      if(err !== null)
        reject(err);
      allImages = items.filter(item => imageMatcher(item, id));
      resolve(allImages);
    });
  });
}

let getImage = function(){

}

let createImage = function(){

}

module.exports = {
  isEmpty     : isEmpty,
  getImages   : getImages,
  adminData   : adminData,
  propdata    : propdata
}
