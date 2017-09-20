"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');
const {safePass}  = require('../../resources/js/safe');

const DB = 'mongodb://127.0.0.1:27017/unity';

let createAdmin = function (email, password, callback) {

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
      'type': 'admin'
    }, function(err, newAdmin) {
      db.close();
      if(err)
        return callback(new Error('Insertion Failed for: ' + thisEmail));
      return callback(null, newAdmin);
    });
  });
};

module.exports = {
  createAdmin: createAdmin
}
