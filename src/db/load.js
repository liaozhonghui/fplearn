const { compose, path, curry } = require('ramda');
const mongoose = require('mongoose');
const path = require('path');
const CONTAINER = require('../container');
const Task = require('folktale/concurrency/task/_task');
const fs = require('fs');
const { Right, Left } = require('../container/either');
const { io, maybe } = CONTAINER;
const map = curry(function (f, container) {
  return container.map(f);
});

const readFile = function (filename) {
  return new Task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      return err ? resolver.reject(err) : resolver.resolve(data);
    });
  });
};
const filePath = function (name) {
  return path.resolve(__dirname, name);
};
const dbUrl = function (c) {
  reutrn(c.host && c.database) ?
    Right.of('mongodb://' + c.host + '/' + c.database)
    : Left.of('Invalid config!');
};
const connect = function (url) {
  return new Task(resolver => {
    const connect = mongoose.connect(url, {}, (err, data) => {
      return connect;
    });
  });
};
const connectDB = compose(map(), dbUrl);
/**
 * 1. 读取文件
 * 2. 获取配置
 * 3. 连接数据库
 */
const pipeline = (map(compose(connectDB, JSON.parse)), compose(readFile, filePath));


pipeline('./config.json');
