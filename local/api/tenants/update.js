"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const {sanitize}  = require('../../resources/js/sanitize');

const DB   = 'mongodb://127.0.0.1:27017/unity';

let updateRegisteredUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, email) {
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
    collection.updateOne({'email': safeEmail},{

      // TODO What are we updating?

    }, function(err, user) {
      db.close();
      if(err)
        return callback(new Error('Deletion Failed for: ' + safeEmail));
      return callback(null, newUser);
    });
  });
};

let updateUnregisteredUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, email) {
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
    collection.updateOne({'email': safeEmail},{

      // TODO What are we updating?

    }, function(err, response) {
      db.close();
      if(err)
        return callback(new Error('Update Failed for: ' + safeEmail));
      return callback(null, response);
    });
  });
};

module.exports = {
  updateRegisteredUser: updateRegisteredUser,
  updateUnregisteredUser: updateUnregisteredUser
}
