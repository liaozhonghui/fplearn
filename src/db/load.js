const path = require('path');
const fs = require('fs');
const { task, of } = require('folktale/concurrency/task');
const { MongoClient } = require('mongodb');
const { compose, curry, identity, toUpper, concat, flip } = require('ramda');
const assert = require('assert');

const CONTAINER = require('../container');
const { IO, Maybe, Either } = CONTAINER;
const { Right, Left } = Either;
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

var nested = of([Right.of('pillows'), Left.of('no sleep for you')]);
const t = nested.map(trace).map(map(map(toUpper))).map(trace);
// const t = map(map(trace), map(map(toUpper)), map(trace), nested);
t.run().promise();

// functor 函子组合
var Compose = function (f_g_x) {
  this.getCompose = f_g_x;
};

Compose.prototype.map = function (f) {
  return new Compose(map(map(f), this.getCompose));
};
var tmd = of(Maybe.of("Rock over london"));
var ctmd = new Compose(tmd);
ctmd = map(trace, map(flip(concat)(", rock on, Chicago"), ctmd));
ctmd.getCompose.run().promise();

var safeProp = curry(function (x, obj) {
  return new Maybe(obj[x]);
});
var safeHead = safeProp(0);
var firstAddressStreet = compose(map(map(safeProp('street'))), map(safeHead), safeProp('addresses'));
var res = firstAddressStreet(
  { addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: "WC2N" }] }
);

console.log('res:', res);
