"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');
const safe        = require('safe-regex')

// DB URLs
const registeredUsersURL   = 'mongodb://127.0.0.10:27017/registeredUsers';
const unRegisteredUsersURL = 'mongodb://127.0.0.10:27017/unRegisteredUsers';

// Create temporary user 
let create = function (code, callback) {
  if (!safe(code))
    return callback(new Error('Unsafe Input!'));
/*
MongoClient.connect(unRegisteredUsersURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/
};

// Insert temporary user permanently
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
