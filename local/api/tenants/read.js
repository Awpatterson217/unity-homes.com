"use strict";
const MongoClient = require('mongodb').MongoClient;

const {safeEmail} = require('../../resources/js/safe');

const DB = 'mongodb://127.0.0.1:27017/unity';

let findRegUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  console.log(thisEmail);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.find({'email': thisEmail}).toArray(function(err, user) {
      db.close();
      if(err)
        return callback(new Error('Could not find ' + thisEmail));
      if(!user.length)
        return callback(new Error('Could not find ' + thisEmail));
      return callback(null, user[0]);
    });
  });
};

let findUnregUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.find({'email': thisEmail}).toArray(function(err, unRegUser) {
      db.close();
      if(err)
        return callback(new Error('Could not find ' + thisEmail));
      if(!unRegUser.length)
        return callback(new Error('Could not find ' + thisEmail));
      return callback(null, unRegUser[0]);
    });
  });
};

let countRegUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    collection.count({'email': thisEmail}, function(err, count) {
      db.close();
      if(err)
        return callback(new Error('Could not count: ' + thisEmail));
      return callback(null, count);
    });
  });

};

let countUnregUser = function (email, callback) {

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    collection.count({'email': thisEmail}, function(err, count) {
      db.close();
      if(err)
        return callback(new Error('Could not count: ' + thisEmail));
      return callback(null, count);
    });
  });
};
  
let allRegUsers = function (email, callback) {
  let allRegUsers = [];

  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('registeredUsers');
    const cursor = collection.find({"type": "tenant"});
    cursor.each(function(err, item) {
        if(item === null) {
            db.close();
            return callback(null, allRegUsers);
        }
        allRegUsers.push(item);
    });
  });
};

let allUnregUsers = function (email, callback) {
  let allUnregUsers = [];
  
  let thisEmail = safeEmail(email);
  if(!thisEmail)
    return callback(new Error('Unsafe Input'));

  MongoClient.connect(DB, function(err, db) {
    if(err) // TODO Log error
      return callback(new Error('Could not connect to DB'));
    const collection = db.collection('unregisteredUsers');
    const cursor = collection.find();
    cursor.each(function(err, item) {
        if(item === null) {
            db.close();
            return callback(null, allUnregUsers);
        }
        allUnregUsers.push(item);
    });
  });
};

module.exports = {
  findRegUser:    findRegUser,
  findUnregUser:  findUnregUser,
  countUnregUser: countUnregUser,
  countRegUser:   countRegUser,
  allUnregUsers:  allUnregUsers,
  allRegUsers:    allRegUsers
}
