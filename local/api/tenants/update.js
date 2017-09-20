"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');

const DB = 'mongodb://127.0.0.1:27017/unity';

let updateRegisteredUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.updateOne({'email': thisEmail, 'type': 'admin'},{

      // TODO What are we updating?

    }, function(err, user) {
      db.close();
      if(err)
        return callback(new Error('Deletion Failed for: ' + thisEmail));
      return callback(null, user);
    });
  });
};

let updateUnregisteredUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.updateOne({'email': thisEmail},{

      // TODO What are we updating?

    }, function(err, response) {
      db.close();
      if(err)
        return callback(new Error('Update Failed for: ' + thisEmail));
      return callback(null, response);
    });
  });
};

module.exports = {
  updateRegisteredUser: updateRegisteredUser,
  updateUnregisteredUser: updateUnregisteredUser
}
