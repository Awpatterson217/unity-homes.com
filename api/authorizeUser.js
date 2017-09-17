"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');

/*
const url = 'mongodb://127.0.0.10:27017/newUsers';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/

const newUsers = {
  1234568: {
    email: 'owner@unity-homes.com',
    type: 'owner',
  },
  1234568: {
    email: 'tenant@unity-homes.com',
    type: 'tenant',
  }
};

let findNewUserByReg = function (registrationNum, callback) {
  if (!newUsers[registrationNum])
    return callback(new Error(
      'No person matching '
       + registrationNum
      )
    );
  return callback(null, newUsers[email]);
};

module.exports = {
  findNewUserByReg: findNewUserByReg
}