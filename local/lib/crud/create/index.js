'use strict';

const MongoClient = require('mongodb').MongoClient;

const {
  customErr,
} = require('../../error');

const DB = process.env.UNITY_MONGO_DB;

const _create = (collectionName, data, callback) => {
  MongoClient.connect(DB, (error, db) => {
    if (error) {
      return callback(customErr('_create() - Connection Failed'));
    }

    const collection = db.collection(collectionName);

    collection.insertOne(data, (error, info) => {
      db.close();

      if (error) {
        return callback(customErr('_create() - Insertion Failed'));
      }

      return callback(null, info);
    });
  });
};

module.exports = {
  _create
};