"use strict";

const MongoClient = require('mongodb').MongoClient;

const {customErr} = require('../resources/js/error');

const DB = 'mongodb://127.0.0.1:27017/unity';

let _create = function (userCollection, data, callback) {
  MongoClient.connect(DB, function(error, db) {
    if(error) // TODO Log error
      return callback(customErr('Connection Failed'));

    const collection = db.collection(userCollection);

    collection.insertOne(data, function(error, user) {
      db.close();

      if(error)
        return callback(customErr('Insertion Failed'));

      return callback(null, user);
    });
  });
};

module.exports = {
  _create: _create
};
