"use strict";

const MongoClient = require('mongodb').MongoClient;

const {customErr} = require('../resources/js/error');

const DB = 'mongodb://127.0.0.1:27017/unity';

let _find = function (userCollection, filter) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB, function(error, db) {
      if(error) // TODO Log error
        return reject(customErr('Connection Failed'));

      const collection = db.collection(userCollection);

      collection.find(filter).toArray(function(error, users) {
        db.close();

        if(error)
          return reject(customErr('Search Failed'));

        if(!users.length)
          return resolve(false);

        return resolve(users[0]);
      });
    });
  });
};

let _count = function (userCollection, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if(error) // TODO Log error
        return callback(customErr('Connection Failed'));

    const collection = db.collection(userCollection);
    collection.count(filter, function(error, count) {
      db.close();

      if(error)
        return callback(customErr('Count Failed'));

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
  _find : _find,
  _count: _count,
  _all  : _all
}
