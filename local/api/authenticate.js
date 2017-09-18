"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');
const safe        = require('safe-regex')

// DB URLs
const userURL     = 'mongodb://127.0.0.10:27017/users';
const newUsersURL = 'mongodb://127.0.0.10:27017/newUsers';

// FAKE DATA
const newUsers = {
  1234567: {
    email: 'owner@unity-homes.com',
    type: 'owner',
  },
  1234568: {
    email: 'tenant@unity-homes.com',
    type: 'tenant',
  }
};
const users = {
  'owner@unity-homes.com': {
    type: "owner",
    password: "Password1",
    registrationId: '1234567'
  },
  'tenant@unity-homes.com': {
    type: "tenant",
    password: "Password1",
    registrationId: "1234568"
  }
};

let findUser = function (email, callback) {
  if (!safe(email))
    return callback(new Error('Unsafe Input!'));
/*
MongoClient.connect(userURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/
  if (!users[email])
    return callback(new Error(
      'No user matching '
       + email
      )
    );
  return callback(null, users[email]);
};

let findNewUser = function (code, callback) {
  if (!safe(code))
    return callback(new Error('Unsafe Input!'));
/*
MongoClient.connect(newUsersURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/
  if (!newUsers[code])
    return callback(new Error(
      'No person matching '
       + code
      )
    );
  return callback(null, newUsers[code]);
};

module.exports = {
  findUser: findUser,
  findNewUser: findNewUser
}
