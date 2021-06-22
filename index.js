const MongoClient = require("mongodb").MongoClient; //imported MongoClient object from mongodb/node.js driver
const assert = require("assert").strict;
const dboper = require("./operations"); //give access to methods in operations module

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

    dboper.insertDocument(
      db, //db object
      { name: "Breadcrumb Trail Campground", description: "Test" }, // document being inserted
      "campsites", // name of collection we're inserting into
      (result) => {
        // callback function passed into operations methods
        console.log("Insert Document", result.ops);

        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found Documents", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("Updated document count: ", result.result.nModified);

              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found documents: ", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Document Count:", result.deletedCount);
                    client.close();
                  }
                );
              });
            }
          );
        }); // finds the document with the specified name and runs operations methods
      }
    );
  });
});
