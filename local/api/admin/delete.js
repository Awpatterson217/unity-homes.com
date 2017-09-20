"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');

const DB   = 'mongodb://127.0.0.1:27017/unity';

let deleteAdmin = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.deleteOne({'email': thisEmail}, function(err, user) {
      db.close();      
      if(err)
        return callback(new Error('Deletion Failed for: ' + thisEmail));
      return callback(null, newUser);
    });
  });
};

module.exports = {
  deleteAdmin: deleteAdmin
}
