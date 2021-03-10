const path = require('path');
const fs = require('fs');
const { task, of } = require('folktale/concurrency/task');
const { MongoClient } = require('mongodb');
const { compose, curry, identity } = require('ramda');
const assert = require('assert');

const CONTAINER = require('../container');
const { concat } = require('lodash');
const { io, maybe, either } = CONTAINER;
const { Right, Left } = either;
const trace = function (v) {
  console.log('trace:', v);
  return v;
};
const map = curry(function (f, container) {
  return container.map(f);
});
const filePath = function (name) {
  return path.resolve(__dirname, name);
};
const dbUrl = function (c) {
  return 'mongodb://' + c.host + '/' + c.database;
};
const readFile = function (filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      return err ? resolver.reject(err) : resolver.resolve(data);
    });
  });
};
const connect = function (url) {
  return task(resolver => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      if (err) console.error(err);
      return err ? resolver.reject(err) : resolver.resolve(client);
    });
  });
};

const connectDBTask = compose(connect, trace, dbUrl, JSON.parse);
const getConfigTask = compose(compose(readFile, filePath));


getConfigTask('./config.json')
  .chain(x => {
    console.log('x:', x);
    return connectDBTask(x);
  })
  .run().promise()
  .then(async (client) => {
    const user = await client.db('us').collection('users').findOne();
    assert.ok(user._id);
    console.log('db连接成功.');
  });
// const logicConnect = compose(compose(connect, trace), trace, (url) => ('mongodb://localhost/us'));
// logicConnect('./config.json')
//   .run().promise()
//   .then(res => {
//     console.log('res:', res);
//   });

