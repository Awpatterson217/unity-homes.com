'use strict';

const MongoClient = require('mongodb').MongoClient;

const { customErr } = require('../../error');

const DB = process.env.UNITY_MONGO_DB;

const _update = (collectionName, filter, data, callback) => {
  MongoClient.connect(DB, (error, db) => {
    if (error) {
      return callback(customErr('_update() - Connection Failed'));
    }

    const collection = db.collection(collectionName);

    collection.updateOne(filter, data, (error, user) => {
      db.close();

      if (error) {
        return callback(customErr('_update() - Update Failed'));
      }

      return callback(null, user.insertedCount);
    });
  });
};

module.exports = {
  _update
};
