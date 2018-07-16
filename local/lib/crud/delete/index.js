"use strict";

const MongoClient = require('mongodb').MongoClient;

const { customErr } = require('../../error');

const DB = process.env.UNITY_MONGO_DB;

const _delete = function(collectionName, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if (error) {
      return callback(customErr('_delete() - Connection Failed'));
    }

    const collection = db.collection(collectionName);

    collection.deleteMany(filter, function(error, res) {
      db.close();

      if (error) {
        return callback(customErr('_delete() - Deletion Failed'));
      }

      return callback(null, res.deletedCount);
    });
  });
};

module.exports = {
  _delete
}
