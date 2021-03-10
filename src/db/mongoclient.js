const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const url = 'mongodb://localhost/us';

function init() {
  MongoClient.connect(url, async function (err, client) {
    if (err) { return console.dir(err); }
    const USCLIENT = client.db('us');

    const first = await USCLIENT.collection('users').findOne();

    console.log('connection us :', first);
  });
}

function connectDB(url) {
  return new Promise((resolve, reject) => {
    MongoClient(url, function (err, client) {
      err ? reject(err) : resolve(client);
    });
  });
}

exports.connectDB = connectDB;
exports.init = init;
