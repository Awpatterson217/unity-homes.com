"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');
const {safeCode}  = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');

const DB  = 'mongodb://127.0.0.1:27017/unity';

let createUnregUser = function (email, code, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  let thisCode = safeCode(code);
  if(!thisCode)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.insertOne({
      'email': thisEmail,
      'code': thisCode
    }, function(err, newUser) {
      db.close();
      if(err)
        return callback(new Error('Insertion Failed for: ' + thisEmail));
      return callback(null, newUser);
    });
  });
};

let createRegUser = function (email, password, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  let thisPass = safePass(password);
  if(!thisPass)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));  
    const collection = db.collection('registeredUsers');
    collection.insertOne({
      'email': thisEmail,
      'password': thisPass,
      'type': 'tenant'
    }, function(err, newUser) {
      db.close();
      if(err)
        return callback(new Error('Insertion Failed for: ' + thisEmail));
      return callback(null, newUser);
    });
  });
};

module.exports = {
  createUnregUser: createUnregUser,
  createRegUser: createRegUser
}
