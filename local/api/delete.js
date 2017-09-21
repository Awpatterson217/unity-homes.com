"use strict";
const MongoClient = require('mongodb').MongoClient;

const DB = 'mongodb://127.0.0.1:27017/unity';

let _delete = function (userCollection, filter, callback) {
  MongoClient.connect(DB, function(error, db) {
    if(error) // TODO Log error
      return callback({err: true, msg: 'Connection Failed'});  
    const collection = db.collection(userCollection);
    collection.deleteMany(filter, function(error, res) {
      db.close();
      if(error)
        return callback({err: true, msg: 'Deletion Failed'});
      return callback(null, res.deletedCount);
    });
  });
};

module.exports = {
  _delete: _delete
}
