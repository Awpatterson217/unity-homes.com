"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');

/*
const url = 'mongodb://127.0.0.10:27017/users';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/

const users = {
  'owner@gmail.com': {
    type: "owner",
    password: "password",
    registrationId: 1234568
  },
  'tenant@unityhomes.com': {
    type: "tenant",
    password: "password",
    registrationId: 1234568
  }
};

let findUserByEmail = function (email, callback) {
  if (!users[email])
    return callback(new Error(
      'No user matching '
       + email
      )
    );
  return callback(null, users[email]);
};

module.exports = {
  findUserByEmail: findUserByEmail
}