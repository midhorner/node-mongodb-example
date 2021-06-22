// NEW CODE WITH CALLBACKS REMOVED
// WHEN NO CALLBACK IS PASSED, AUTOMATICALLY RETURNS RESULTS AS PROMISES - NATIVE TO MDB NODE DRIVER API

// CRUD methods

exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection); // (collection) a string - name of collection being passed in
  return coll.insertOne(document); // method now returns promise
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null); // update operator = $set: update lets mdb know that we want to write over an existing object with the update object
};

// ORIGINAL CODE WITH CALLBACKS

// const assert = require("assert").strict;
// // CRUD methods

// exports.insertDocument = (db, document, collection, callback) => {
//   const coll = db.collection(collection); // (collection) a string - name of collection being passed in
//   coll.insertOne(document, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };

// exports.findDocuments = (db, collection, callback) => {
//   const coll = db.collection(collection);
//   coll.find().toArray((err, docs) => {
//     assert.strictEqual(err, null);
//     callback(docs);
//   });
// };

// exports.removeDocument = (db, document, collection, callback) => {
//   const coll = db.collection(collection);
//   coll.deleteOne(document, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };

// exports.updateDocument = (db, document, update, collection, callback) => {
//   const coll = db.collection(collection);
//   coll.updateOne(document, { $set: update }, null, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };
