const MongoClient = require('mongodb').MongoClient;

const {
  customErr,
} = require('./local/lib/error');

const {
  create
} = Object;

const url = 'mongodb://127.0.0.1:27017/test';

let mongoDBConnection = null;

const mongoDB = {
  closeConnection(callback) {
    mongoDBConnection.close(callback);
  },
  create(collectionName, data, callback) {
    if (!this.connection.isConnected()) {
      return callback(customErr('No Connection'))
    }
  
    const collection = mongoDBConnection.collection(collectionName);
  
    collection.insertOne(data, (error, info) => {
      if (error) {
        return callback(customErr('Insertion Failed'));
      }
  
      return callback(null, info);
    });
  },
  get(collectionName, filter) {
    return mongoDBConnection.collection(collectionName)
      .find(filter)
      .toArray()
      .then(users => users[0]);
  },
  count(collectionName, filter) {
    return mongoDBConnection.collection(
      collectionName
    ).countDocuments(
      filter
    );
  },
  getAll(collectionName) {
    const collection = mongoDBConnection.collection(collectionName);

    return collection.find().toArray();
  },
  update(collectionName, filter, data, callback) {
    const collection = mongoDBConnection.collection(collectionName);
  
    collection.updateOne(filter, data, (error, user) => {
      if (error) {
        return callback(customErr('Update Failed'));
      }
  
      return callback(null, user.insertedCount);
    });
  },
  delete(collectionName, filter, callback) {
    const collection = mongoDBConnection.collection(collectionName);
  
    collection.deleteMany(filter, (error, res) => {
      if (error) {
        return callback(customErr('Deletion Failed'));
      }
  
      return callback(null, res.deletedCount);
    });
  }
}

const initMongoDB = (url, callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, connection) => {
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
