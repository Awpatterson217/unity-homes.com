"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

const {sanitize} = require('../../resources/js/sanitize');

const DB   = 'mongodb://127.0.0.1:27017/unity';

let findRegUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  if (!safeEmail)
    return callback(new Error('Unsafe Input'));
  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.find({'email': safeEmail}).toArray(function(err, user) {
      db.close();
      if(err)
        return callback(new Error('Could not find ' + safeEmail));
      if(!user.length)
        return callback(new Error('Could not find ' + safeEmail));
      return callback(null, user[0]);
    });
  });
};

let findUnregUser = function (email, callback) {
  let safeEmail = sanitize(email, function(error, email) {
    if(error) // TODO Log error
      return false;
    return email;
  });
  if (!safeEmail)
    return callback(new Error('Unsafe Input!'));
  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.find({'email': safeEmail}).toArray(function(err, unRegUser) {
      db.close();
      if(err)
        return callback(new Error('Could not find ' + safeEmail));
      if(!unRegUser.length)
        return callback(new Error('Could not find ' + safeEmail));
      return callback(null, unRegUser[0]);
    });
  });
};

module.exports = {
  findRegUser: findRegUser,
  findUnregUser: findUnregUser
}
