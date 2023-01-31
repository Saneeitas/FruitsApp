/** @format */

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const dbName = "fruitsDB";
const client = new MongoClient(uri);

client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connect successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function () {
    client.close();
  });
});

const insertDocuments = function (db, callback) {
  const collection = db.collection("friuts");
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit",
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour",
      },
      {
        name: "Banana",
        score: 9,
        review: "Great Stuff",
      },
    ],
    function (err, result) {
      assert.equal(err, null);
      //assert.equal(3);
      //assert.equal(3, result.ops.length);
      console.log("Inserted 3 document");
      callback(result);
    }
  );
};

const findDocuments = function (db, callback) {
  const collection = db.collection("friuts");
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
