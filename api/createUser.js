"use strict";
const MongoClient = require('mongodb').MongoClient
const assert      = require('assert');

/*
const url = 'mongodb://127.0.0.10:27017/users';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
*/