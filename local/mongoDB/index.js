'use strict';

const MongoClient = require('mongodb').MongoClient;

const {
  customErr,
} = require('./../lib/error');

const {
  create
} = Object;

const URL = process.env.UNITY_MONGO_URL;
const DB  = process.env.UNITY_MONGO_DB;

let mongoDBConnection = null;

const mongoDB = {
  closeConnection(callback) {
    mongoDBConnection.close(callback);
  },
  create(collectionName, data, callback) {
    if (!mongoDBConnection.isConnected()) {
      return callback(customErr('No Connection'))
    }
  
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);

    collection.insertOne(data, (error, info) => {
      if (error) {
        return callback(customErr('Insertion Failed'));
      }
  
      return callback(null, info);
    });
  },
  get(collectionName, filter) {
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);

    return collection
      .find(filter)
      .toArray()
      .then(users => users[0]);
  },
  count(collectionName, filter) {
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);

    return collection.countDocuments(filter)
  },
  getAll(collectionName) {
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);

    return collection.find().toArray();
  },
  update(collectionName, filter, data, callback) {
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);

    collection.updateOne(filter, data, (error, user) => {
      if (error) {
        return callback(customErr('Update Failed'));
      }
  
      return callback(null, user.insertedCount);
    });
  },
  delete(collectionName, filter, callback) {
    const db = mongoDBConnection.db(DB);

    const collection = db.collection(collectionName);
  
    collection.deleteMany(filter, (error, res) => {
      if (error) {
        return callback(customErr('Deletion Failed'));
      }
  
      return callback(null, res.deletedCount);
    });
  }
}

const initMongoDB = (callback) => {
  MongoClient.connect(URL, { useNewUrlParser: true }, (error, connection) => {
    if (error) {
      return callback(error);
    }

    mongoDBConnection = connection;

    callback(null, connection);
  });
}

const getMongoDB = () => {
  if (mongoDBConnection) {
    if (mongoDBConnection.isConnected) {
      return create(mongoDB)
    }
  }
}

module.exports = {
  initMongoDB,
  getMongoDB,
}
