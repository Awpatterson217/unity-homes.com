"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');

const DB = 'mongodb://127.0.0.1:27017/unity';
  
let allAdmin = function (email, callback) {
  let allRegUsers = [];

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    const cursor = collection.find({"type": "admin"});
    cursor.each(function(err, item) {
        if(item === null) {
            db.close();
            return callback(null, allRegUsers);
        }
        allRegUsers.push(item);
    });
  });
};

module.exports = {
  allAdmin:    allAdmin
}
