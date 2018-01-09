"use strict";

const MongoClient = require('mongodb').MongoClient;

const {customErr} = require('../resources/js/error');

const DB = 'mongodb://127.0.0.1:27017/unity';

let _update = function (userCollection, filter, data, callback) {
  MongoClient.connect(DB, function (error, db) {
    if (error) // TODO Log error
      return callback(customErr('Connection Failed'));

    const collection = db.collection(userCollection);

    collection.updateOne(filter, data, function (error, user) {
      db.close();

      if (error)
        return callback(customErr('Update Failed'));

      return callback(null, user.insertedCount);
    });
  });
};

module.exports = {
  _update
};
