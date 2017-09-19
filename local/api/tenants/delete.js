"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const {sanitize}  = require('../../resources/js/sanitize');

const DB   = 'mongodb://127.0.0.1:27017/unity';

let deleteRegUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, response) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  if (!safeEmail)
    return callback(new Error('Unsafe Input'));
  MongoClient.connect(DB, function(err, db) {
    if(err)
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.deleteOne({'email': safeEmail}, function(err, user) {
      db.close();      
      if(err)
        return callback(new Error('Deletion Failed for: ' + safeEmail));
      return callback(null, newUser);
    });
  });
};

let deleteUnregUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, response) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  if (!safeEmail)
    return callback(new Error('Unsafe Input'));
  MongoClient.connect(DB, function(err, db) {
    if(err)
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.deleteMany({'email': safeEmail}, function(err, response) {
      db.close();
      if(err)
        return callback(new Error('Deletion Failed for: ' + safeEmail));
      return callback(null, response);
    });
  });
};

module.exports = {
  deleteRegUser: deleteRegUser,
  deleteUnregUser: deleteUnregUser
}
