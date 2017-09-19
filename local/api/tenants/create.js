"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

const {sanitize}      = require('../../resources/js/sanitize');
const {findUnregUser} = require('../../resources/js/sanitize');

const DB   = 'mongodb://127.0.0.1:27017/unity';

let createUnregUser = function (email, code, callback) {
  let safeEmail = sanitize(email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  let safeCode = sanitize(code, function(error, code) {
    if(error) // TODO Log error
      return false;
    return code;
  });  
  if (!safeEmail)
    return callback(new Error('Unsafe Input'));
  if (!safeCode)
    return callback(new Error('Unsafe Input'));
  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.insertOne({
      'email': safeEmail,
      'code': safeCode
    }, function(err, newUser) {
      db.close();
      if(err)
        return callback(new Error('Insertion Failed for: ' + safeEmail));
      return callback(null, newUser);
    });
  });
};

let createRegUser = function (email, password, callback) {
  let safeEmail = sanitize(email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  let safePassword = sanitize(code, function(error, password) {
    if(error) // TODO Log error
      return false;
    return password;
  });  
  if (!safeEmail)
    return callback(new Error('Unsafe Input'));
  if (!safePassword)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));  
    const collection = db.collection('unregisteredUsers');
    // Make sure user was registered 
    // by admin with findUnregUser
    collection.insertOne({
      'email': safeEmail,
      'password': safePassword,
      'type': 'tenant'
    }, function(err, newUser) {
      db.close();
      if(err)
        return callback(new Error('Insertion Failed for: ' + safeEmail));
      return callback(null, newUser);
    });
  });
};

module.exports = {
  createUnregUser: createUnregUser,
  createRegUser: createRegUser
}
