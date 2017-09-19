"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');
const {sanitize} = require('../resources/js/sanitize')

const db   = 'mongodb://127.0.0.1:27017/unity';

// Create temporary user 
let create = function (email, code, callback) {
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
  MongoClient.connect(db, function(err, db) {
    if(err)
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.insertOne({'email': safeEmail, 'code': safeCode}, function(err, newUser) {
      if(err)
        return callback(new Error('Insertion Failed for: ' + safeEmail));
      db.close();
      return callback(null, newUser);
    });
  });
};

// Insert user permanently
let register = function (email, code, callback) {
  if (!safe(email))
    return callback(new Error('Unsafe Input!'));
  if (!safe(code))
    return callback(new Error('Unsafe Input!'));
/*
MongoClient.connect(registeredUsersURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/
};

module.exports = {
  register: register,
  create: create
}
