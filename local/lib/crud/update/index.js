"use strict";

const MongoClient = require('mongodb').MongoClient;

const { customErr } = require('../../error');

const DB = process.env.UNITY_MONGO_DB;

const _update = function(collectionName, filter, data, callback) {
  MongoClient.connect(DB, function(error, db) {
    if (error) // TODO Log error
      return callback(customErr('_update() - Connection Failed'));

    const collection = db.collection(collectionName);

    collection.updateOne(filter, data, function(error, user) {
      db.close();

      if (error)
        return callback(customErr('_update() - Update Failed'));

      return callback(null, user.insertedCount);
    });
  });
};

module.exports = {
  _update
};
