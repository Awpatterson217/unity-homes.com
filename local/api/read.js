"use strict";
const MongoClient = require('mongodb').MongoClient;

const DB = 'mongodb://127.0.0.1:27017/unity';

let _find = function (userCollection, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if(error) // TODO Log error
      return callback({err: true, msg: 'Connection Failed'});  
    const collection = db.collection(userCollection);
    collection.find(filter).toArray(function(error, users) {
      db.close();
      if(error)
        return callback({err: true, msg: 'Search Failed'});
      if(!users.length)
        return callback({err: true, msg: 'Nothing Found'});
      return callback(null, users[0], users.length);
    });
  });
};

let _count = function (userCollection, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if(error) // TODO Log error
      return callback({err: true, msg: 'Connection Failed'});  
    const collection = db.collection(userCollection);
    collection.count(filter, function(error, count) {
      db.close();
      if(error)
        return callback({err: true, msg: 'Count Failed'});
      return callback(null, count);
    });
  });
};

let _all = function (userCollection) {
    return MongoClient.connect(DB).then(function(db) {
      let collection = db.collection(userCollection);
      return collection.find().toArray();
    }).then(function(items) {
      return items;
    });
};

/*
  MongoClient.connect(DB).then(function(error, db) {
    const collection = db.collection(userCollection);
    const cursor = collection.find();
    cursor.toArray(function(error, item) {

    });
  });
    const cursor = db.collection(userCollection).find().toArray();

  */

module.exports = {
  _find:  _find,
  _count: _count,
  _all:   _all
}
