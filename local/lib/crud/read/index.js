"use strict";

const MongoClient = require('mongodb').MongoClient;

const { customErr } = require('../../error');

const DB = process.env.UNITY_MONGO_DB;

const _find = function(collectionName, filter) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB, function(error, db) {
      if (error) {
        return reject(customErr('_find() - Connection Failed'));
      }

      const collection = db.collection(collectionName);

      collection.find(filter).toArray(function(error, users) {
        db.close();

        if (error) {
          return reject(customErr('_find() - Search Failed'));
        }

        if (!users.length) {
          return resolve(false);
        }

        return resolve(users[0]);
      });
    });
  });
};

const _count = function(collectionName, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if (error) {
      return callback(customErr('_count() - Connection Failed'));
    }

    const collection = db.collection(collectionName);
    collection.count(filter, function(error, count) {
      db.close();

      if (error) {
        return callback(customErr('_count() - Count Failed'));
      }

      return callback(null, count);
    });
  });
};

const _all = function(collectionName) {
    return MongoClient.connect(DB).then(function(db) {
      const collection = db.collection(collectionName);

      return collection.find().toArray();
    }).then(function(items) {
      return items;
    });
};

module.exports = {
  _find,
  _count,
  _all
}
