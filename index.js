const MongoClient = require("mongodb").MongoClient; //imported MongoClient object from mongodb/node.js driver
const assert = require("assert").strict;

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //use MongoClient to make a connection to the mongodb server
  assert.strictEqual(err, null); //typical node err, res callback - assert.strictEqual says if err === null, continue, otherwise log error and close

  console.log("Connected correctly to server");

  const db = client.db(dbname); // use client object from callback function to access the nucampsite db

  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection", result);

    const collection = db.collection("campsites"); //dropped then recreated the campsites collection

    collection.insertOne(
      //insert new document into campsites collection
      { name: "Breadcrumb Trail Campground", description: "Test" },
      (err, result) => {
        assert.strictEqual(err, null);
        console.log("Insert Document", result.ops);

        collection.find().toArray((err, docs) => {
          // allows us to console.log all documents from the campsites collection
          assert.strictEqual(err, null);
          console.log("Found Documents: ", docs);

          client.close(); //closes client
        });
      }
    );
  });
});
